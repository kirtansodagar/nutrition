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
  category: "legume" | "grain" | "vegetable" | "dairy" | "meat" | "prepared" | "snack" | "beverage" | "fruit" | "condiment";
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

const PROMPT = `You are a nutrition expert analyzing a food photo. For EVERY visible food item, provide accurate identification, portion estimation, and TOTAL nutrition for that exact portion.

STEP 1: Identify each distinct food item. Be specific ("Butter Chicken" not "curry", "Margherita Pizza" not "pizza").

STEP 2: Estimate portion in grams using visual cues:
- Standard dinner plate (25cm) = ~800g capacity
- Closed fist = ~150g | Palm = ~100g | Cupped hand = ~75g
- Thumb = ~10g | Tablespoon = ~15g

Indian portions: roti=30g, naan=60-80g, paratha=80-100g, 1 bowl dal=150-200g, 1 plate rice=180-220g, samosa=75-90g, idli=50g, dosa=80-100g, masala dosa=150-180g, 1 piece chicken=80-100g, 1 egg=55g, glass=250ml
Western portions: 1 pizza slice=120-150g, medium pizza=500-600g, burger=200-250g, sandwich=150-200g, pasta bowl=200-250g, noodles cup=200-250g

STEP 3: Calculate TOTAL nutrition for the estimated portion. Here are reference values to use (per 100g, multiply by portion):

Indian foods (per 100g): Butter Chicken=240cal/18p/8c/15f, Chicken Tikka Masala=220/18/8/13, Paneer Butter Masala=250/10/12/18, Palak Paneer=180/10/8/12, Dal Tadka=100/6/14/2, Rajma=130/7/18/3, Chole=150/7/20/4, Chicken Biryani=200/10/24/7, Veg Biryani=170/4/25/6, Butter Naan=310/8/45/10, Wheat Roti=260/8/48/3, Paratha=300/7/40/12, Cooked Rice=130/3/28/0.3, Samosa=275/5/30/15, Idli=80/3/15/0.5, Dosa=160/4/22/6, Pav Bhaji=200/5/28/8, Vada Pav=250/5.5/32/11, Egg Omelette=150/11/2/11, Boiled Egg=155/13/1.1/11, Curd=60/3.5/5/3, Paneer=265/18/4/21, Ghee=900/0/0/100, Butter=720/0.9/0.1/81, Chicken Curry=180/16/5/10, Fish Curry=150/15/4/8, Mutton Curry=230/20/5/14, Aloo Gobi=120/3/16/5, Bhindi Masala=100/2.5/10/5.5

Western foods (per 100g): Pizza cheese=266/11/33/10, Pizza pepperoni=298/13/34/12, Burger beef=250/14/24/10, French Fries=312/3.5/41/15, Pasta tomato=130/5/20/3, Pasta cream=175/6/18/8, Chicken Sandwich=220/12/22/9, Caesar Salad=120/5/8/8, Chicken Nuggets=280/15/18/16, Chocolate Cake=370/5/50/18, Banana=89/1.1/23/0.3, Apple=52/0.3/14/0.2, Mango=60/0.8/15/0.4

RULES:
- Calculate total calories/protein/carbs/fat for the EXACT portion estimated (not per 100g)
- If portion is 200g of Butter Chicken, calories = 240 * 2 = 480
- Be realistic about portions
- Return ONLY valid JSON array

Return format:
[{"name":"Butter Chicken","estimatedGrams":200,"category":"meat","calories":480,"proteinG":36,"carbsG":16,"fatG":30}]`;

async function callGroq(base64Image: string, retries = 2): Promise<string> {
  const url = "https://api.groq.com/openai/v1/chat/completions";

  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: PROMPT },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        temperature: 0.1,
        max_tokens: 2048,
      }),
    });

    if (response.status === 429 && attempt < retries) {
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      continue;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error ${response.status}: ${error}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error("No response from Groq");
    return text;
  }

  throw new Error("Groq API: max retries exceeded");
}

function parseJsonResponse(raw: string): RecognizedFood[] {
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      return JSON.parse(match[1]);
    }
    const arrayMatch = raw.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }
    throw new Error(`Failed to parse JSON from: ${raw}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured. Get a free key at https://console.groq.com/keys" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { imageUrl, imageBase64 } = parsed.data;

    let base64: string;
    if (imageBase64) {
      base64 = imageBase64;
    } else {
      const imageResponse = await fetch(imageUrl!);
      if (!imageResponse.ok) {
        return NextResponse.json(
          { error: "Failed to fetch image from URL" },
          { status: 400 }
        );
      }
      const buffer = await imageResponse.arrayBuffer();
      base64 = Buffer.from(buffer).toString("base64");
    }

    let rawResponse: string;
    try {
      rawResponse = await callGroq(base64);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("Groq call failed:", message);
      return NextResponse.json(
        { error: "AI model error", details: message },
        { status: 500 }
      );
    }

    let recognized: RecognizedFood[];
    try {
      recognized = parseJsonResponse(rawResponse);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Could not parse AI response",
          rawResponse,
          model: GROQ_MODEL,
        },
        { status: 200 }
      );
    }

    const items = await Promise.all(
      recognized.map(async (item) => {
        // Try local DB first for verified nutrition data
        const dbNutrition = await lookupNutrition(item.name, item.estimatedGrams);

        if (dbNutrition && dbNutrition.source === "local-db") {
          return {
            name: item.name,
            estimatedGrams: item.estimatedGrams,
            category: item.category,
            nutrition: {
              calories: dbNutrition.calories,
              proteinG: dbNutrition.proteinG,
              carbsG: dbNutrition.carbsG,
              fatG: dbNutrition.fatG,
            },
            source: "local-db",
          };
        }

        // Fall back to AI-provided total nutrition for this portion
        return {
          name: item.name,
          estimatedGrams: item.estimatedGrams,
          category: item.category,
          nutrition: {
            calories: item.calories,
            proteinG: item.proteinG,
            carbsG: item.carbsG,
            fatG: item.fatG,
          },
          source: "ai-estimated",
        };
      })
    );

    return NextResponse.json({
      success: true,
      items,
      model: GROQ_MODEL,
      rawResponse,
    });
  } catch (err) {
    console.error("Food recognition error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}
