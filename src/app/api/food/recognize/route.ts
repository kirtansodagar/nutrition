import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { lookupNutrition } from "@/lib/food/nutrition-lookup";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const requestSchema = z.object({
  imageUrl: z.string().url().optional(),
  imageBase64: z.string().min(100).optional(),
}).refine((data) => data.imageUrl || data.imageBase64, {
  message: "Either imageUrl or imageBase64 is required",
});

interface RecognizedFood {
  name: string;
  estimatedGrams: number;
  category: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

function buildIdentifyPrompt(): string {
  return [
    "You are an expert food recognition system. Analyze this food image with extreme precision.",
    "",
    "TASK: Identify EVERY distinct food item on the plate. Be hyper-specific.",
    "",
    "IDENTIFICATION RULES:",
    "- Name the EXACT dish (e.g., Chicken Butter Masala not chicken curry)",
    "- For Indian food, use the common Hindi/English name",
    "- Separate each component of a thali/plate individually",
    "- If you see rice + dal + sabzi + roti, list ALL 4 separately",
    "- If you see a combo like Idli Sambar, split into Idli and Sambar separately",
    "- Identify condiments, pickles, raita if visible",
    "- Do not miss small items like green chili, papad, salad",
    "",
    "Return ONLY a JSON array of food names. Nothing else.",
    'Example: ["Butter Chicken", "Naan", "Rice", "Raita"]',
  ].join("\n");
}

function buildPortionPrompt(foodNames: string[]): string {
  const list = foodNames.map((n, i) => (i + 1) + ". " + n).join("\n");
  return [
    "You are a portion estimation expert. For each food item listed below, estimate the EXACT weight in grams.",
    "",
    "FOOD ITEMS TO ESTIMATE:",
    list,
    "",
    "VISUAL PORTION RULES - Look at the photo carefully:",
    "1. PLATE COMPARISON: Standard Indian dinner plate = 25cm diameter. Half full = 200-250g.",
    "2. BOWL COMPARISON: Small katori = 150-200g. Large bowl = 250-300g.",
    "3. FIST RULE: Closed fist = 150g.",
    "4. PALM RULE: Palm of hand = 100g for meat/protein.",
    "5. CUPPED HAND: Cupped hand = 75g for grains/rice.",
    "",
    "INDIAN PORTION STANDARDS:",
    "- 1 roti/chapati = 30-35g | 1 naan = 70-80g | 1 paratha = 90-110g",
    "- 1 small katori dal/sabzi = 120-150g | 1 large bowl = 200-250g",
    "- 1 plate rice heaped = 180-220g | 1 small bowl rice = 100-120g",
    "- 1 samosa = 75-90g | 1 vada = 60-80g | 1 idli = 45-55g",
    "- 1 plain dosa = 80-100g | 1 masala dosa = 150-180g",
    "- 1 piece chicken with bone = 80-100g | 1 egg = 55g",
    "- 1 glass lassi/buttermilk = 250-300g | 1 cup chai = 150-180g",
    "- 1 plate thali full = total 600-800g across all items",
    "- 1 vada pav = 140-160g | 1 pav bhaji = 300-350g",
    "",
    "WESTERN PORTIONS:",
    "- 1 pizza slice = 120-150g | 1 medium pizza = 500-600g",
    "- 1 burger = 200-250g | 1 sandwich = 150-200g",
    "- 1 bowl pasta = 200-250g | 1 cup noodles = 200-250g",
    "- 1 banana = 120g | 1 apple = 180g | 1 slice bread = 30-40g",
    "",
    "CRITICAL: Look at how much food is ACTUALLY on the plate. Err slightly higher.",
    "",
    "Return ONLY a JSON array of numbers (grams per item, same order).",
    "Example: [200, 80, 180, 150]",
  ].join("\n");
}

function buildNutritionPrompt(): string {
  return [
    "You are a clinical nutritionist. Calculate EXACT total nutrition for specific food portions.",
    "",
    "REFERENCE DATA (per 100g) - cal/protein/carbs/fat:",
    "",
    "Butter Chicken: 240/18/8/15 | Chicken Tikka Masala: 220/18/8/13",
    "Paneer Butter Masala: 250/10/12/18 | Palak Paneer: 180/10/8/12",
    "Dal Tadka: 100/6/14/2 | Dal Makhani: 130/7/15/4",
    "Rajma: 130/7/18/3 | Chole: 150/7/20/4",
    "Chicken Biryani: 200/10/24/7 | Veg Biryani: 170/4/25/6",
    "Butter Naan: 310/8/45/10 | Wheat Roti: 260/8/48/3",
    "Paratha: 300/7/40/12 | Cooked Rice: 130/3/28/0.3",
    "Samosa: 275/5/30/15 | Idli: 80/3/15/0.5 | Dosa: 160/4/22/6",
    "Vada Pav: 250/5.5/32/11 | Pav Bhaji: 200/5/28/8",
    "Egg Omelette: 150/11/2/11 | Boiled Egg: 155/13/1.1/11",
    "Paneer: 265/18/4/21 | Curd: 60/3.5/5/3 | Ghee: 900/0/0/100",
    "Pizza cheese: 266/11/33/10 | Burger beef: 250/14/24/10",
    "French Fries: 312/3.5/41/15 | Pasta tomato: 130/5/20/3",
    "Chicken Sandwich: 220/12/22/9 | Caesar Salad: 120/5/8/8",
    "Banana: 89/1.1/23/0.3 | Apple: 52/0.3/14/0.2 | Mango: 60/0.8/15/0.4",
    "Masala Chai: 40/1/6/1.5 | Filter Coffee: 35/1/5/1",
    "Sweet Lassi: 90/3.5/14/2.5 | Buttermilk: 25/1.5/3/0.5",
    "Almond: 580/21/22/50 | Cashew: 550/18/30/44 | Peanut: 570/26/16/49",
    "Chicken Curry: 180/16/5/10 | Fish Curry: 150/15/4/8 | Mutton Curry: 230/20/5/14",
    "Aloo Gobi: 120/3/16/5 | Bhindi Masala: 100/2.5/10/5.5",
    "Mutton Biryani: 220/12/22/9 | Egg Fried Rice: 180/6/24/6",
    "Chicken Nuggets: 280/15/18/16 | Chocolate Cake: 370/5/50/18",
    "",
    "RULES:",
    "- Use EXACT per-100g values from reference, multiply by (grams/100)",
    "- Round calories to integer, protein/carbs/fat to 1 decimal",
    "- For foods not in reference, use best clinical estimate",
    "",
    "Return ONLY a JSON array of objects.",
    'Format: [{"calories":480,"proteinG":36.0,"carbsG":16.0,"fatG":30.0}]',
  ].join("\n");
}

async function callGroq(base64Image: string | null, prompt: string, retries = 2): Promise<string> {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const content: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
    { type: "text", text: prompt },
  ];
  if (base64Image) {
    content.push({ type: "image_url", image_url: { url: "data:image/jpeg;base64," + base64Image } });
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + GROQ_API_KEY },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: "user", content }],
        temperature: 0.05,
        max_tokens: 2048,
      }),
    });
    if (response.status === 429 && attempt < retries) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }
    if (!response.ok) {
      const error = await response.text();
      throw new Error("Groq API error " + response.status + ": " + error);
    }
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("No response from Groq");
    return text;
  }
  throw new Error("Groq API: max retries exceeded");
}

function parseJsonArray(raw: string): any[] {
  try { return JSON.parse(raw); } catch { /* continue */ }
  const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) { try { return JSON.parse(match[1]); } catch { /* continue */ } }
  const arrayMatch = raw.match(/\[[\s\S]*\]/);
  if (arrayMatch) { try { return JSON.parse(arrayMatch[0]); } catch { /* continue */ } }
  throw new Error("Failed to parse JSON from: " + raw);
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
    }

    const { imageUrl, imageBase64 } = parsed.data;
    let base64: string;
    if (imageBase64) {
      base64 = imageBase64;
    } else {
      const imageResponse = await fetch(imageUrl!);
      if (!imageResponse.ok) {
        return NextResponse.json({ error: "Failed to fetch image" }, { status: 400 });
      }
      const buffer = await imageResponse.arrayBuffer();
      base64 = Buffer.from(buffer).toString("base64");
    }

    // PASS 1: Identify foods
    let foodNames: string[];
    try {
      const raw = await callGroq(base64, buildIdentifyPrompt());
      foodNames = parseJsonArray(raw);
      if (!Array.isArray(foodNames) || foodNames.length === 0) throw new Error("No foods identified");
    } catch (err) {
      return NextResponse.json({ error: "Could not identify food", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
    }

    // PASS 2: Estimate portions
    let portions: number[];
    try {
      const raw = await callGroq(base64, buildPortionPrompt(foodNames));
      portions = parseJsonArray(raw);
      if (!Array.isArray(portions) || portions.length !== foodNames.length) throw new Error("Count mismatch");
    } catch {
      portions = foodNames.map(() => 150);
    }

    // PASS 3: Calculate nutrition
    let nutritionResults: Array<{ calories: number; proteinG: number; carbsG: number; fatG: number }>;
    try {
      const input = foodNames.map((name, i) => name + " (" + portions[i] + "g)").join("\n");
      const raw = await callGroq(null, buildNutritionPrompt() + "\n\nFOOD ITEMS:\n" + input);
      nutritionResults = parseJsonArray(raw);
      if (!Array.isArray(nutritionResults) || nutritionResults.length !== foodNames.length) throw new Error("Count mismatch");
    } catch {
      nutritionResults = await Promise.all(
        foodNames.map(async (name, i) => {
          const n = await lookupNutrition(name, portions[i]);
          return n ? { calories: n.calories, proteinG: n.proteinG, carbsG: n.carbsG, fatG: n.fatG } : { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 };
        })
      );
    }

    // Build items, prefer local DB
    const items = await Promise.all(
      foodNames.map(async (name, i) => {
        const db = await lookupNutrition(name, portions[i]);
        if (db && db.source === "local-db") {
          return { name, estimatedGrams: portions[i], nutrition: { calories: db.calories, proteinG: db.proteinG, carbsG: db.carbsG, fatG: db.fatG }, source: "local-db" };
        }
        return { name, estimatedGrams: portions[i], nutrition: nutritionResults[i], source: "ai-calculated" };
      })
    );

    return NextResponse.json({ success: true, items, model: GROQ_MODEL, passes: 3 });
  } catch (err) {
    console.error("Food recognition error:", err);
    return NextResponse.json({ error: "Internal server error", details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
