import { prisma } from "@/lib/db";

export interface NutritionInfo {
  foodId: string;
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  source: string;
}

const ALIASES: Record<string, string> = {
  "dal tadka": "Moong Dal (cooked)",
  "dal fry": "Moong Dal (cooked)",
  "moong dal": "Moong Dal (cooked)",
  "masoor dal": "Masoor Dal (cooked)",
  "toor dal": "Toor Dal (cooked)",
  "chana dal": "Chana Dal (cooked)",
  "urad dal": "Urad Dal (cooked)",
  "rice": "Basmati Rice (cooked)",
  "steamed rice": "Basmati Rice (cooked)",
  "basmati rice": "Basmati Rice (cooked)",
  "roti": "Wheat Roti",
  "chapati": "Wheat Roti",
  "phulka": "Wheat Roti",
  "naan": "Naan",
  "paratha": "Paratha",
  "dosa": "Dosa",
  "masala dosa": "Masala Dosa",
  "idli": "Idli",
  "samosa": "Samosa",
  "biryani": "Biryani",
  "chicken biryani": "Biryani",
  "paneer": "Paneer",
  "palak paneer": "Palak Paneer",
  "paneer tikka": "Paneer Tikka",
  "butter chicken": "Butter Chicken",
  "chicken curry": "Chicken Curry",
  "egg curry": "Egg Curry",
  "rajma": "Rajma (cooked)",
  "chole": "Chole (cooked)",
  "chole bhature": "Chole (cooked)",
  "aloo gobi": "Aloo Gobi",
  "mixed veg": "Mixed Vegetable Curry",
  "curd": "Curd",
  "yogurt": "Curd",
  "ghee": "Ghee",
  "buttermilk": "Buttermilk",
  "lassi": "Lassi (Sweet)",
  "chai": "Chai",
  "tea": "Chai",
  "coffee": "Filter Coffee",
  "banana": "Banana",
  "apple": "Apple",
  "egg": "Egg (whole)",
  "boiled egg": "Egg Boiled",
  "omlette": "Egg Omelette",
  "omelette": "Egg Omelette",
  "omelet": "Egg Omelette",
  "bread": "Bread (white)",
  "milk": "Milk (Whole)",
  "poha": "Poha",
  "upma": "Upma",
  "vada pav": "Vada Pav",
  "pav bhaji": "Pav Bhaji",
  "bhel puri": "Bhel Puri",
  "pani puri": "Pani Puri",
  "sev puri": "Sev Puri",
  "uttapam": "Uttapam",
  "rava dosa": "Rava Dosa",
  "malai kofta": "Malai Kofta",
  "dal makhani": "Dal Makhani",
  "jeera rice": "Basmati Rice (cooked)",
  "dhokla": "Dhokla",
  "green chili": "Green Chili",
  "chili": "Green Chili",
  "chilli": "Green Chili",
  "green chilli": "Green Chili",
  "pizza": "Pizza",
  "burger": "Burger",
  "sandwich": "Sandwich",
  "pasta": "Pasta",
  "noodles": "Noodles",
  "maggi": "Noodles",
  "dal rice": "Moong Dal (cooked)",
  "thali": "Thali",
  "fish curry": "Fish Curry",
  "mutton curry": "Mutton Curry",
  "kebab": "Kebab",
  "tandoori chicken": "Tandoori Chicken",
  "raita": "Raita",
  "papad": "Papad",
  "pickle": "Pickle",
  "salad": "Salad",
  "pav": "Pav Bread",
  "butter naan": "Naan",
  "garlic naan": "Naan",
  "cheese": "Cheese",
  "butter": "Butter",
  "oil": "Oil",
  "sugar": "Sugar",
  "honey": "Honey",
  "lemon": "Lemon",
  "tomato": "Tomato",
  "onion": "Onion",
  "potato": "Potato",
  "chicken": "Chicken",
  "fish": "Fish",
  "prawn": "Prawn",
  "mutton": "Mutton",
  "paneer butter masala": "Paneer Butter Masala",
  "butter paneer": "Paneer Butter Masala",
  "soya chunks": "Soya Chunks",
  "chowmein": "Chowmein",
  "fried rice": "Fried Rice",
  "manchurian": "Manchurian",
  "momos": "Momos",
  "spring roll": "Spring Roll",
  "cutlet": "Cutlet",
  "pakora": "Pakora",
  "bhajiya": "Pakora",
  "vada": "Vada",
  "medu vada": "Vada",
  "pongal": "Pongal",
  "khichdi": "Khichdi",
  "pulao": "Pulao",
  "ghee rice": "Basmati Rice (cooked)",
  "tofu": "Tofu",
  "broccoli": "Broccoli",
  "spinach": "Spinach",
  "mushroom": "Mushroom",
  "sweet corn": "Sweet Corn",
  "corn": "Sweet Corn",
  "green peas": "Green Peas",
  "peas": "Green Peas",
  "carrot": "Carrot",
  "cabbage": "Cabbage",
  "cauliflower": "Cauliflower",
  "capsicum": "Capsicum",
  "bell pepper": "Capsicum",
  "cucumber": "Cucumber",
  "beetroot": "Beetroot",
  "pumpkin": "Pumpkin",
  "sweet potato": "Sweet Potato",
  "avocado": "Avocado",
  "mango": "Mango",
  "orange": "Orange",
  "grapes": "Grapes",
  "watermelon": "Watermelon",
  "pineapple": "Pineapple",
  "papaya": "Papaya",
  "guava": "Guava",
  "pomegranate": "Pomegranate",
  "coconut": "Coconut",
  "peanut": "Peanut",
  "almond": "Almond",
  "cashew": "Cashew",
  "walnut": "Walnut",
};

async function searchOpenFoodFacts(query: string): Promise<{
  name: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
} | null> {
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5&fields=product_name,nutriments`;
    const response = await fetch(url, {
      headers: { "User-Agent": "NutritionTracker/1.0" },
    });
    if (!response.ok) return null;
    const data = await response.json();
    const products = data.products;
    if (!products || products.length === 0) return null;
    for (const product of products) {
      const n = product.nutriments;
      if (n && typeof n["energy-kcal_100g"] === "number" && typeof n["proteins_100g"] === "number") {
        return {
          name: product.product_name || query,
          calories: Math.round(n["energy-kcal_100g"]),
          proteinG: Math.round(n["proteins_100g"] * 10) / 10,
          carbsG: Math.round((n["carbohydrates_100g"] || 0) * 10) / 10,
          fatG: Math.round((n["fat_100g"] || 0) * 10) / 10,
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}

function buildNutritionResult(
  name: string,
  caloriesPer100g: number,
  proteinPer100g: number,
  carbsPer100g: number,
  fatPer100g: number,
  portionGrams: number,
  foodId: string,
  source: string
): NutritionInfo {
  const m = portionGrams / 100;
  return {
    foodId,
    name,
    calories: Math.round(caloriesPer100g * m),
    proteinG: Math.round(proteinPer100g * m * 10) / 10,
    carbsG: Math.round(carbsPer100g * m * 10) / 10,
    fatG: Math.round(fatPer100g * m * 10) / 10,
    source,
  };
}

export async function lookupNutrition(
  foodName: string,
  portionGrams: number
): Promise<NutritionInfo | null> {
  const lowerName = foodName.toLowerCase().trim();

  // 1. Check aliases
  const aliasMatch = ALIASES[lowerName];
  if (aliasMatch) {
    const food = await prisma.food.findFirst({
      where: { name: { equals: aliasMatch, mode: "insensitive" } },
    });
    if (food) {
      return buildNutritionResult(food.name, food.caloriesPer100g, food.proteinPer100g, food.carbsPer100g, food.fatPer100g, portionGrams, food.id, "local-db");
    }
  }

  // 2. Exact match in DB
  let food = await prisma.food.findFirst({
    where: { name: { equals: foodName, mode: "insensitive" } },
  });

  // 3. Contains match
  if (!food) {
    food = await prisma.food.findFirst({
      where: { name: { contains: foodName, mode: "insensitive" } },
    });
  }

  // 4. Reverse contains
  if (!food) {
    const allFoods = await prisma.food.findMany({ select: { id: true, name: true } });
    for (const dbFood of allFoods) {
      if (lowerName.includes(dbFood.name.toLowerCase())) {
        food = await prisma.food.findUnique({ where: { id: dbFood.id } });
        break;
      }
    }
  }

  // 5. Word match
  if (!food) {
    const words = foodName.split(" ");
    for (const word of words) {
      if (word.length > 2) {
        food = await prisma.food.findFirst({
          where: { name: { contains: word, mode: "insensitive" } },
        });
        if (food) break;
      }
    }
  }

  if (food) {
    return buildNutritionResult(food.name, food.caloriesPer100g, food.proteinPer100g, food.carbsPer100g, food.fatPer100g, portionGrams, food.id, "local-db");
  }

  // 6. Open Food Facts API
  const offResult = await searchOpenFoodFacts(foodName);
  if (offResult) {
    return buildNutritionResult(offResult.name, offResult.calories, offResult.proteinG, offResult.carbsG, offResult.fatG, portionGrams, "", "open-food-facts");
  }

  // 7. No match
  return null;
}

const FALLBACK_NUTRITION: Record<string, { cal: number; pro: number; carb: number; fat: number }> = {
  "legume": { cal: 110, pro: 8, carb: 18, fat: 1 },
  "grain": { cal: 130, pro: 4, carb: 25, fat: 1.5 },
  "vegetable": { cal: 35, pro: 2, carb: 6, fat: 0.5 },
  "dairy": { cal: 60, pro: 3.5, carb: 5, fat: 3 },
  "meat": { cal: 180, pro: 25, carb: 0, fat: 8 },
  "prepared": { cal: 200, pro: 8, carb: 25, fat: 8 },
  "snack": { cal: 250, pro: 5, carb: 30, fat: 12 },
  "beverage": { cal: 40, pro: 0.5, carb: 8, fat: 0.5 },
  "fruit": { cal: 60, pro: 0.5, carb: 14, fat: 0.3 },
  "condiment": { cal: 50, pro: 1, carb: 10, fat: 0.5 },
};

export async function lookupNutritionWithFallback(
  foodName: string,
  portionGrams: number,
  category?: string
): Promise<NutritionInfo> {
  const result = await lookupNutrition(foodName, portionGrams);
  if (result) return result;

  const fallback = category ? FALLBACK_NUTRITION[category] : null;
  const m = portionGrams / 100;

  return {
    foodId: "",
    name: foodName,
    calories: Math.round((fallback?.cal ?? 150) * m),
    proteinG: Math.round((fallback?.pro ?? 6) * m * 10) / 10,
    carbsG: Math.round((fallback?.carb ?? 20) * m * 10) / 10,
    fatG: Math.round((fallback?.fat ?? 6) * m * 10) / 10,
    source: "category-fallback",
  };
}
