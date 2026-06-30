import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required for seeding.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const foods = [
  // ── Legumes / Dal (15) ──────────────────────────────────────────────
  {
    name: "Moong Dal (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 104, proteinPer100g: 7.6, carbsPer100g: 17.9, fatPer100g: 0.4, fiberPer100g: 3.2,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Masoor Dal (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 110, proteinPer100g: 8.5, carbsPer100g: 18.0, fatPer100g: 0.4, fiberPer100g: 3.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Toor Dal (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 112, proteinPer100g: 8.0, carbsPer100g: 19.5, fatPer100g: 0.5, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Chana Dal (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 118, proteinPer100g: 8.2, carbsPer100g: 20.0, fatPer100g: 0.7, fiberPer100g: 5.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Urad Dal (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 105, proteinPer100g: 7.5, carbsPer100g: 17.0, fatPer100g: 0.3, fiberPer100g: 4.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Rajma (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 7.8, carbsPer100g: 21.0, fatPer100g: 0.4, fiberPer100g: 5.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Chole (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 128, proteinPer100g: 8.0, carbsPer100g: 22.0, fatPer100g: 0.6, fiberPer100g: 6.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "high-protein", "indian", "punjabi"],
  },
  {
    name: "Lobia (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 115, proteinPer100g: 7.2, carbsPer100g: 20.0, fatPer100g: 0.3, fiberPer100g: 4.8,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Moong Whole (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 110, proteinPer100g: 8.0, carbsPer100g: 18.5, fatPer100g: 0.5, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Kala Chana (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 118, proteinPer100g: 8.5, carbsPer100g: 19.0, fatPer100g: 0.6, fiberPer100g: 6.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Black Eyed Peas (cooked)", category: "legume", source: "usda",
    caloriesPer100g: 116, proteinPer100g: 7.7, carbsPer100g: 20.8, fatPer100g: 0.5, fiberPer100g: 5.4,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Green Gram Sprouts", category: "legume", source: "ifct",
    caloriesPer100g: 82, proteinPer100g: 7.0, carbsPer100g: 12.0, fatPer100g: 0.4, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "low-calorie", "indian"],
  },
  {
    name: "Kabuli Chana (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 122, proteinPer100g: 8.5, carbsPer100g: 20.5, fatPer100g: 0.6, fiberPer100g: 6.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Red Kidney Beans (cooked)", category: "legume", source: "usda",
    caloriesPer100g: 127, proteinPer100g: 8.7, carbsPer100g: 22.8, fatPer100g: 0.5, fiberPer100g: 6.4,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "high-protein"],
  },
  {
    name: "Horse Gram (cooked)", category: "legume", source: "ifct",
    caloriesPer100g: 115, proteinPer100g: 7.8, carbsPer100g: 20.0, fatPer100g: 0.5, fiberPer100g: 5.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── Grains (15) ─────────────────────────────────────────────────────
  {
    name: "Basmati Rice (cooked)", category: "grain", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 2.7, carbsPer100g: 28.0, fatPer100g: 0.3, fiberPer100g: 0.4,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }, { name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Brown Rice (cooked)", category: "grain", source: "usda",
    caloriesPer100g: 123, proteinPer100g: 2.7, carbsPer100g: 25.6, fatPer100g: 1.0, fiberPer100g: 1.6,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }, { name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "whole-grain", "indian"],
  },
  {
    name: "Wheat Roti", category: "grain", source: "ifct",
    caloriesPer100g: 290, proteinPer100g: 8.5, carbsPer100g: 55.0, fatPer100g: 3.5, fiberPer100g: 5.0,
    commonPortions: JSON.stringify([{ name: "1 roti", grams: 30 }, { name: "2 roti", grams: 60 }]),
    tags: ["vegetarian", "indian", "staple"],
  },
  {
    name: "Naan", category: "grain", source: "ifct",
    caloriesPer100g: 310, proteinPer100g: 9.0, carbsPer100g: 52.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 100 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Paratha", category: "grain", source: "ifct",
    caloriesPer100g: 320, proteinPer100g: 7.5, carbsPer100g: 50.0, fatPer100g: 9.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 paratha", grams: 80 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Poha", category: "grain", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 2.5, carbsPer100g: 26.0, fatPer100g: 1.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "maharashtrian"],
  },
  {
    name: "Upma", category: "grain", source: "ifct",
    caloriesPer100g: 145, proteinPer100g: 3.5, carbsPer100g: 25.0, fatPer100g: 3.0, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Idli", category: "grain", source: "ifct",
    caloriesPer100g: 95, proteinPer100g: 3.0, carbsPer100g: 19.0, fatPer100g: 0.4, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "2 idli", grams: 120 }]),
    tags: ["vegetarian", "south-indian", "low-calorie"],
  },
  {
    name: "Dosa", category: "grain", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 3.5, carbsPer100g: 28.0, fatPer100g: 3.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 dosa", grams: 80 }]),
    tags: ["vegetarian", "south-indian"],
  },
  {
    name: "Appam", category: "grain", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 2.5, carbsPer100g: 27.0, fatPer100g: 2.0, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 appam", grams: 80 }]),
    tags: ["vegetarian", "kerala"],
  },
  {
    name: "Rava Idli", category: "grain", source: "ifct",
    caloriesPer100g: 135, proteinPer100g: 3.5, carbsPer100g: 24.0, fatPer100g: 2.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "2 idli", grams: 120 }]),
    tags: ["vegetarian", "south-indian"],
  },
  {
    name: "Vermicelli", category: "grain", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 10.0, carbsPer100g: 72.0, fatPer100g: 0.8, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Oats (cooked)", category: "grain", source: "usda",
    caloriesPer100g: 71, proteinPer100g: 2.5, carbsPer100g: 12.0, fatPer100g: 1.5, fiberPer100g: 1.7,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 300 }]),
    tags: ["vegetarian", "whole-grain"],
  },
  {
    name: "Quinoa (cooked)", category: "grain", source: "usda",
    caloriesPer100g: 120, proteinPer100g: 4.4, carbsPer100g: 21.3, fatPer100g: 1.9, fiberPer100g: 2.8,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "high-protein", "gluten-free"],
  },
  {
    name: "Maida (refined flour)", category: "grain", source: "ifct",
    caloriesPer100g: 364, proteinPer100g: 8.3, carbsPer100g: 76.0, fatPer100g: 1.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 120 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── Vegetables (30) ─────────────────────────────────────────────────
  {
    name: "Aloo Gobi", category: "vegetable", source: "ifct",
    caloriesPer100g: 105, proteinPer100g: 2.5, carbsPer100g: 14.0, fatPer100g: 4.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "north-indian"],
  },
  {
    name: "Palak Paneer", category: "vegetable", source: "ifct",
    caloriesPer100g: 135, proteinPer100g: 7.0, carbsPer100g: 6.0, fatPer100g: 10.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi", "high-protein"],
  },
  {
    name: "Bhindi Masala", category: "vegetable", source: "ifct",
    caloriesPer100g: 90, proteinPer100g: 2.0, carbsPer100g: 8.0, fatPer100g: 5.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Baingan Bharta", category: "vegetable", source: "ifct",
    caloriesPer100g: 85, proteinPer100g: 1.8, carbsPer100g: 7.0, fatPer100g: 5.0, fiberPer100g: 3.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Mixed Vegetable Curry", category: "vegetable", source: "ifct",
    caloriesPer100g: 95, proteinPer100g: 2.5, carbsPer100g: 10.0, fatPer100g: 4.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Cabbage Sabzi", category: "vegetable", source: "ifct",
    caloriesPer100g: 65, proteinPer100g: 1.5, carbsPer100g: 6.0, fatPer100g: 3.5, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "low-calorie"],
  },
  {
    name: "Cauliflower Curry", category: "vegetable", source: "ifct",
    caloriesPer100g: 75, proteinPer100g: 2.0, carbsPer100g: 7.0, fatPer100g: 4.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Carrot Sabzi", category: "vegetable", source: "ifct",
    caloriesPer100g: 80, proteinPer100g: 1.5, carbsPer100g: 10.0, fatPer100g: 3.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Green Peas Curry", category: "vegetable", source: "ifct",
    caloriesPer100g: 110, proteinPer100g: 5.0, carbsPer100g: 14.0, fatPer100g: 3.5, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Tomato Curry", category: "vegetable", source: "ifct",
    caloriesPer100g: 60, proteinPer100g: 1.2, carbsPer100g: 6.0, fatPer100g: 3.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Spinach Curry", category: "vegetable", source: "ifct",
    caloriesPer100g: 55, proteinPer100g: 2.5, carbsPer100g: 4.0, fatPer100g: 3.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "low-calorie", "iron-rich"],
  },
  {
    name: "Ridge Gourd Sabzi", category: "vegetable", source: "ifct",
    caloriesPer100g: 50, proteinPer100g: 1.0, carbsPer100g: 5.0, fatPer100g: 2.5, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "low-calorie"],
  },
  {
    name: "Bottle Gourd Sabzi", category: "vegetable", source: "ifct",
    caloriesPer100g: 45, proteinPer100g: 1.0, carbsPer100g: 4.5, fatPer100g: 2.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "low-calorie"],
  },
  {
    name: "Bitter Gourd Sabzi", category: "vegetable", source: "ifct",
    caloriesPer100g: 55, proteinPer100g: 1.5, carbsPer100g: 5.0, fatPer100g: 3.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Drumstick Sambar", category: "vegetable", source: "ifct",
    caloriesPer100g: 65, proteinPer100g: 3.0, carbsPer100g: 7.0, fatPer100g: 2.5, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Onion", category: "vegetable", source: "usda",
    caloriesPer100g: 40, proteinPer100g: 1.1, carbsPer100g: 9.3, fatPer100g: 0.1, fiberPer100g: 1.7,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Tomato (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Potato (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 77, proteinPer100g: 2.0, carbsPer100g: 17.0, fatPer100g: 0.1, fiberPer100g: 2.2,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Spinach (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, fiberPer100g: 2.2,
    commonPortions: JSON.stringify([{ name: "1 bunch", grams: 200 }]),
    tags: ["vegetarian", "raw", "iron-rich"],
  },
  {
    name: "Cauliflower (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 25, proteinPer100g: 1.9, carbsPer100g: 5.0, fatPer100g: 0.3, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 600 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Broccoli", category: "vegetable", source: "usda",
    caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 6.6, fatPer100g: 0.4, fiberPer100g: 2.6,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 90 }]),
    tags: ["vegetarian", "raw", "low-calorie"],
  },
  {
    name: "Capsicum", category: "vegetable", source: "usda",
    caloriesPer100g: 31, proteinPer100g: 1.0, carbsPer100g: 6.0, fatPer100g: 0.3, fiberPer100g: 2.1,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Brinjal (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 25, proteinPer100g: 1.0, carbsPer100g: 6.0, fatPer100g: 0.2, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 200 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Pumpkin (cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 26, proteinPer100g: 1.0, carbsPer100g: 6.5, fatPer100g: 0.1, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 200 }]),
    tags: ["vegetarian", "low-calorie"],
  },
  {
    name: "Beetroot (cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 44, proteinPer100g: 1.7, carbsPer100g: 10.0, fatPer100g: 0.2, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 170 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Turnip (cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 32, proteinPer100g: 1.1, carbsPer100g: 7.4, fatPer100g: 0.1, fiberPer100g: 1.8,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Lady Finger (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 33, proteinPer100g: 1.9, carbsPer100g: 7.0, fatPer100g: 0.2, fiberPer100g: 3.2,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 100 }]),
    tags: ["vegetarian", "low-calorie"],
  },
  {
    name: "Corn (sweet, cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 96, proteinPer100g: 3.4, carbsPer100g: 21.0, fatPer100g: 1.5, fiberPer100g: 2.4,
    commonPortions: JSON.stringify([{ name: "1 ear", grams: 150 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Mushroom (cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 28, proteinPer100g: 3.0, carbsPer100g: 3.0, fatPer100g: 0.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "low-calorie"],
  },
  {
    name: "Green Chillies", category: "vegetable", source: "usda",
    caloriesPer100g: 40, proteinPer100g: 2.0, carbsPer100g: 8.8, fatPer100g: 0.4, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "2 medium", grams: 20 }]),
    tags: ["vegetarian", "spicy"],
  },

  // ── Dairy (10) ──────────────────────────────────────────────────────
  {
    name: "Milk (Whole)", category: "dairy", source: "usda",
    caloriesPer100g: 61, proteinPer100g: 3.2, carbsPer100g: 4.8, fatPer100g: 3.3, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 200 }, { name: "1 cup", grams: 240 }]),
    tags: ["vegetarian", "staple"],
  },
  {
    name: "Curd (Dahi)", category: "dairy", source: "ifct",
    caloriesPer100g: 70, proteinPer100g: 4.0, carbsPer100g: 5.5, fatPer100g: 3.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }, { name: "1 katori", grams: 150 }]),
    tags: ["vegetarian", "probiotic", "indian"],
  },
  {
    name: "Paneer", category: "dairy", source: "ifct",
    caloriesPer100g: 265, proteinPer100g: 18.0, carbsPer100g: 4.0, fatPer100g: 20.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }, { name: "1 cup cubes", grams: 100 }]),
    tags: ["vegetarian", "high-protein", "indian"],
  },
  {
    name: "Butter", category: "dairy", source: "usda",
    caloriesPer100g: 717, proteinPer100g: 0.9, carbsPer100g: 0.1, fatPer100g: 81.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 15 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Ghee", category: "dairy", source: "ifct",
    caloriesPer100g: 900, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 15 }, { name: "1 tsp", grams: 5 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Buttermilk (Chaas)", category: "dairy", source: "ifct",
    caloriesPer100g: 35, proteinPer100g: 2.0, carbsPer100g: 3.0, fatPer100g: 1.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "low-calorie"],
  },
  {
    name: "Cream", category: "dairy", source: "usda",
    caloriesPer100g: 340, proteinPer100g: 2.0, carbsPer100g: 3.0, fatPer100g: 36.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 15 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Cheese (Cheddar)", category: "dairy", source: "usda",
    caloriesPer100g: 403, proteinPer100g: 25.0, carbsPer100g: 1.3, fatPer100g: 33.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 25 }]),
    tags: ["vegetarian", "high-protein"],
  },
  {
    name: "Skimmed Milk", category: "dairy", source: "usda",
    caloriesPer100g: 34, proteinPer100g: 3.4, carbsPer100g: 5.0, fatPer100g: 0.1, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 200 }]),
    tags: ["vegetarian", "low-fat"],
  },
  {
    name: "Lassi (Plain)", category: "dairy", source: "ifct",
    caloriesPer100g: 65, proteinPer100g: 3.0, carbsPer100g: 6.0, fatPer100g: 3.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── Non-Veg (15) ────────────────────────────────────────────────────
  {
    name: "Chicken Curry", category: "non-veg", source: "ifct",
    caloriesPer100g: 165, proteinPer100g: 18.0, carbsPer100g: 3.0, fatPer100g: 9.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Egg Curry", category: "non-veg", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 8.5, carbsPer100g: 4.0, fatPer100g: 9.0, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Fish Curry", category: "non-veg", source: "ifct",
    caloriesPer100g: 125, proteinPer100g: 16.0, carbsPer100g: 2.5, fatPer100g: 6.0, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Mutton Curry", category: "non-veg", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 17.0, carbsPer100g: 2.0, fatPer100g: 12.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Tandoori Chicken", category: "non-veg", source: "ifct",
    caloriesPer100g: 155, proteinPer100g: 20.0, carbsPer100g: 2.0, fatPer100g: 7.5, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "punjabi"],
  },
  {
    name: "Egg Boiled", category: "non-veg", source: "usda",
    caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 11.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 egg", grams: 50 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Egg Omelette", category: "non-veg", source: "usda",
    caloriesPer100g: 154, proteinPer100g: 11.0, carbsPer100g: 0.7, fatPer100g: 12.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "2 eggs", grams: 120 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Chicken Tikka", category: "non-veg", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 22.0, carbsPer100g: 2.0, fatPer100g: 7.0, fiberPer100g: 0.2,
    commonPortions: JSON.stringify([{ name: "4 pieces", grams: 150 }]),
    tags: ["non-vegetarian", "indian", "punjabi"],
  },
  {
    name: "Fish Fry", category: "non-veg", source: "ifct",
    caloriesPer100g: 185, proteinPer100g: 20.0, carbsPer100g: 5.0, fatPer100g: 9.0, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 150 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Prawns Curry", category: "non-veg", source: "ifct",
    caloriesPer100g: 115, proteinPer100g: 14.0, carbsPer100g: 2.0, fatPer100g: 5.5, fiberPer100g: 0.2,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "coastal"],
  },
  {
    name: "Chicken Biryani", category: "non-veg", source: "ifct",
    caloriesPer100g: 190, proteinPer100g: 12.0, carbsPer100g: 22.0, fatPer100g: 6.0, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["non-vegetarian", "indian", "hyderabadi"],
  },
  {
    name: "Lamb Seekh Kebab", category: "non-veg", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 18.0, carbsPer100g: 2.0, fatPer100g: 14.0, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "2 pieces", grams: 120 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Chicken Shawarma", category: "non-veg", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 14.0, carbsPer100g: 15.0, fatPer100g: 8.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 wrap", grams: 250 }]),
    tags: ["non-vegetarian", "middle-eastern"],
  },
  {
    name: "Fish Masala", category: "non-veg", source: "ifct",
    caloriesPer100g: 135, proteinPer100g: 17.0, carbsPer100g: 3.0, fatPer100g: 6.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Egg Bhurji", category: "non-veg", source: "ifct",
    caloriesPer100g: 145, proteinPer100g: 10.0, carbsPer100g: 3.0, fatPer100g: 10.5, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["non-vegetarian", "indian"],
  },

  // ── Prepared Dishes (30) ────────────────────────────────────────────
  {
    name: "Biryani (Veg)", category: "prepared", source: "ifct",
    caloriesPer100g: 175, proteinPer100g: 4.5, carbsPer100g: 24.0, fatPer100g: 6.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Pulao", category: "prepared", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 4.0, carbsPer100g: 24.0, fatPer100g: 5.0, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Dal Makhani", category: "prepared", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 6.5, carbsPer100g: 12.0, fatPer100g: 7.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Butter Chicken", category: "prepared", source: "ifct",
    caloriesPer100g: 195, proteinPer100g: 16.0, carbsPer100g: 5.0, fatPer100g: 12.0, fiberPer100g: 0.8,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian", "punjabi"],
  },
  {
    name: "Paneer Tikka", category: "prepared", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 14.0, carbsPer100g: 5.0, fatPer100g: 16.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "punjabi", "high-protein"],
  },
  {
    name: "Samosa", category: "prepared", source: "ifct",
    caloriesPer100g: 275, proteinPer100g: 5.0, carbsPer100g: 30.0, fatPer100g: 15.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Dhokla", category: "prepared", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 4.0, carbsPer100g: 18.0, fatPer100g: 3.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }, { name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "gujarati", "snack"],
  },
  {
    name: "Green Chili", category: "vegetable", source: "usda",
    caloriesPer100g: 40, proteinPer100g: 2.0, carbsPer100g: 8.0, fatPer100g: 0.5, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 10 }, { name: "10g", grams: 10 }]),
    tags: ["vegetarian", "indian", "spice"],
  },
  {
    name: "Kachori", category: "prepared", source: "ifct",
    caloriesPer100g: 320, proteinPer100g: 6.0, carbsPer100g: 35.0, fatPer100g: 17.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Vada Pav", category: "prepared", source: "ifct",
    caloriesPer100g: 250, proteinPer100g: 5.5, carbsPer100g: 32.0, fatPer100g: 11.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 150 }]),
    tags: ["vegetarian", "indian", "maharashtrian"],
  },
  {
    name: "Dabeli", category: "prepared", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 5.0, carbsPer100g: 30.0, fatPer100g: 9.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 120 }]),
    tags: ["vegetarian", "indian", "gujarati"],
  },
  {
    name: "Pav Bhaji", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 4.0, carbsPer100g: 22.0, fatPer100g: 8.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["vegetarian", "indian", "maharashtrian"],
  },
  {
    name: "Rajma Chawal", category: "prepared", source: "ifct",
    caloriesPer100g: 125, proteinPer100g: 5.5, carbsPer100g: 21.0, fatPer100g: 2.0, fiberPer100g: 3.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 350 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Chole Bhature", category: "prepared", source: "ifct",
    caloriesPer100g: 240, proteinPer100g: 6.0, carbsPer100g: 30.0, fatPer100g: 10.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Pani Puri", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 3.0, carbsPer100g: 28.0, fatPer100g: 6.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "6 puris", grams: 150 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Bhel Puri", category: "prepared", source: "ifct",
    caloriesPer100g: 165, proteinPer100g: 3.5, carbsPer100g: 25.0, fatPer100g: 5.5, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Sev Puri", category: "prepared", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 4.0, carbsPer100g: 25.0, fatPer100g: 9.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Masala Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 3.5, carbsPer100g: 26.0, fatPer100g: 5.5, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 dosa", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Mysore Masala Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 3.8, carbsPer100g: 27.0, fatPer100g: 6.0, fiberPer100g: 1.3,
    commonPortions: JSON.stringify([{ name: "1 dosa", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Rava Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 165, proteinPer100g: 3.5, carbsPer100g: 25.0, fatPer100g: 5.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 dosa", grams: 120 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Uttapam", category: "prepared", source: "ifct",
    caloriesPer100g: 155, proteinPer100g: 4.0, carbsPer100g: 24.0, fatPer100g: 4.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 uttapam", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Pesarattu", category: "prepared", source: "ifct",
    caloriesPer100g: 145, proteinPer100g: 5.5, carbsPer100g: 20.0, fatPer100g: 4.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 dosa", grams: 120 }]),
    tags: ["vegetarian", "indian", "south-indian", "high-protein"],
  },
  {
    name: "Aloo Paratha", category: "prepared", source: "ifct",
    caloriesPer100g: 280, proteinPer100g: 6.0, carbsPer100g: 42.0, fatPer100g: 9.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 paratha", grams: 120 }]),
    tags: ["vegetarian", "indian", "north-indian"],
  },
  {
    name: "Gobi Paratha", category: "prepared", source: "ifct",
    caloriesPer100g: 260, proteinPer100g: 6.5, carbsPer100g: 40.0, fatPer100g: 7.5, fiberPer100g: 3.5,
    commonPortions: JSON.stringify([{ name: "1 paratha", grams: 120 }]),
    tags: ["vegetarian", "indian", "north-indian"],
  },
  {
    name: "Paneer Paratha", category: "prepared", source: "ifct",
    caloriesPer100g: 295, proteinPer100g: 9.0, carbsPer100g: 38.0, fatPer100g: 10.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 paratha", grams: 120 }]),
    tags: ["vegetarian", "indian", "north-indian", "high-protein"],
  },
  {
    name: "Chana Masala", category: "prepared", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 6.0, carbsPer100g: 14.0, fatPer100g: 5.0, fiberPer100g: 4.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Malai Kofta", category: "prepared", source: "ifct",
    caloriesPer100g: 185, proteinPer100g: 5.0, carbsPer100g: 12.0, fatPer100g: 13.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Shahi Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 195, proteinPer100g: 10.0, carbsPer100g: 6.0, fatPer100g: 15.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "mughlai"],
  },
  {
    name: "Kadai Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 175, proteinPer100g: 9.0, carbsPer100g: 6.0, fatPer100g: 13.0, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Navratan Korma", category: "prepared", source: "ifct",
    caloriesPer100g: 155, proteinPer100g: 4.0, carbsPer100g: 10.0, fatPer100g: 11.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "mughlai"],
  },
  {
    name: "Vegetable Kofta", category: "prepared", source: "ifct",
    caloriesPer100g: 145, proteinPer100g: 3.5, carbsPer100g: 12.0, fatPer100g: 9.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Dal Fry", category: "prepared", source: "ifct",
    caloriesPer100g: 105, proteinPer100g: 5.5, carbsPer100g: 12.0, fatPer100g: 3.5, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── Snacks / Sweets (15) ────────────────────────────────────────────
  {
    name: "Namkeen (Mixture)", category: "snack", source: "ifct",
    caloriesPer100g: 480, proteinPer100g: 10.0, carbsPer100g: 55.0, fatPer100g: 25.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 50 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Ladoo (Besan)", category: "sweet", source: "ifct",
    caloriesPer100g: 420, proteinPer100g: 8.0, carbsPer100g: 50.0, fatPer100g: 22.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Gulab Jamun", category: "sweet", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 4.0, carbsPer100g: 55.0, fatPer100g: 14.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "2 pieces", grams: 80 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Jalebi", category: "sweet", source: "ifct",
    caloriesPer100g: 380, proteinPer100g: 3.0, carbsPer100g: 65.0, fatPer100g: 12.0, fiberPer100g: 0.2,
    commonPortions: JSON.stringify([{ name: "2 pieces", grams: 80 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Kheer (Rice Pudding)", category: "sweet", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 3.5, carbsPer100g: 18.0, fatPer100g: 4.0, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Barfi (Kaju)", category: "sweet", source: "ifct",
    caloriesPer100g: 400, proteinPer100g: 6.0, carbsPer100g: 55.0, fatPer100g: 18.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 30 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Rasgulla", category: "sweet", source: "ifct",
    caloriesPer100g: 185, proteinPer100g: 4.0, carbsPer100g: 35.0, fatPer100g: 3.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Sandesh", category: "sweet", source: "ifct",
    caloriesPer100g: 210, proteinPer100g: 6.0, carbsPer100g: 32.0, fatPer100g: 6.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "2 pieces", grams: 60 }]),
    tags: ["vegetarian", "indian", "sweet", "bengali"],
  },
  {
    name: "Halwa (Moong Dal)", category: "sweet", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 7.0, carbsPer100g: 40.0, fatPer100g: 18.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Peda", category: "sweet", source: "ifct",
    caloriesPer100g: 380, proteinPer100g: 7.0, carbsPer100g: 50.0, fatPer100g: 17.0, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 30 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Chikki (Peanut)", category: "sweet", source: "ifct",
    caloriesPer100g: 490, proteinPer100g: 15.0, carbsPer100g: 55.0, fatPer100g: 25.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 40 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Murukku", category: "snack", source: "ifct",
    caloriesPer100g: 470, proteinPer100g: 8.0, carbsPer100g: 60.0, fatPer100g: 22.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "4 pieces", grams: 40 }]),
    tags: ["vegetarian", "indian", "south-indian", "snack"],
  },
  {
    name: "Papdi", category: "snack", source: "ifct",
    caloriesPer100g: 460, proteinPer100g: 7.5, carbsPer100g: 58.0, fatPer100g: 22.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Mathri", category: "snack", source: "ifct",
    caloriesPer100g: 450, proteinPer100g: 7.0, carbsPer100g: 55.0, fatPer100g: 22.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "2 pieces", grams: 40 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Pakora (Mixed Veg)", category: "snack", source: "ifct",
    caloriesPer100g: 280, proteinPer100g: 5.0, carbsPer100g: 25.0, fatPer100g: 17.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "snack"],
  },

  // ── Beverages (10) ──────────────────────────────────────────────────
  {
    name: "Chai (with milk)", category: "beverage", source: "ifct",
    caloriesPer100g: 28, proteinPer100g: 0.6, carbsPer100g: 3.5, fatPer100g: 1.2, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Sweet Lassi", category: "beverage", source: "ifct",
    caloriesPer100g: 85, proteinPer100g: 3.0, carbsPer100g: 12.0, fatPer100g: 3.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Nimbu Pani", category: "beverage", source: "ifct",
    caloriesPer100g: 35, proteinPer100g: 0.1, carbsPer100g: 8.5, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage", "low-calorie"],
  },
  {
    name: "Masala Chai", category: "beverage", source: "ifct",
    caloriesPer100g: 30, proteinPer100g: 0.7, carbsPer100g: 4.0, fatPer100g: 1.3, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Filter Coffee", category: "beverage", source: "ifct",
    caloriesPer100g: 35, proteinPer100g: 0.8, carbsPer100g: 4.5, fatPer100g: 1.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian", "beverage"],
  },
  {
    name: "Buttermilk Drink", category: "beverage", source: "ifct",
    caloriesPer100g: 32, proteinPer100g: 1.8, carbsPer100g: 2.5, fatPer100g: 1.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Jaljeera", category: "beverage", source: "ifct",
    caloriesPer100g: 30, proteinPer100g: 0.5, carbsPer100g: 6.5, fatPer100g: 0.2, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Aam Panna", category: "beverage", source: "ifct",
    caloriesPer100g: 50, proteinPer100g: 0.3, carbsPer100g: 12.0, fatPer100g: 0.1, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Kokum Sherbet", category: "beverage", source: "ifct",
    caloriesPer100g: 45, proteinPer100g: 0.2, carbsPer100g: 11.0, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },
  {
    name: "Thandai", category: "beverage", source: "ifct",
    caloriesPer100g: 80, proteinPer100g: 3.0, carbsPer100g: 10.0, fatPer100g: 3.5, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian", "beverage"],
  },

  // ── International Fruits (10) ───────────────────────────────────────
  {
    name: "Banana", category: "fruit", source: "usda",
    caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23.0, fatPer100g: 0.3, fiberPer100g: 2.6,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Apple", category: "fruit", source: "usda",
    caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14.0, fatPer100g: 0.2, fiberPer100g: 2.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 180 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Orange", category: "fruit", source: "usda",
    caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 12.0, fatPer100g: 0.1, fiberPer100g: 2.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 130 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Mango", category: "fruit", source: "usda",
    caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15.0, fatPer100g: 0.4, fiberPer100g: 1.6,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 335 }]),
    tags: ["vegetarian", "fruit", "indian"],
  },
  {
    name: "Grapes", category: "fruit", source: "usda",
    caloriesPer100g: 69, proteinPer100g: 0.7, carbsPer100g: 18.0, fatPer100g: 0.2, fiberPer100g: 0.9,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Watermelon", category: "fruit", source: "usda",
    caloriesPer100g: 30, proteinPer100g: 0.6, carbsPer100g: 7.6, fatPer100g: 0.2, fiberPer100g: 0.4,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 280 }]),
    tags: ["vegetarian", "fruit", "low-calorie"],
  },
  {
    name: "Pineapple", category: "fruit", source: "usda",
    caloriesPer100g: 50, proteinPer100g: 0.5, carbsPer100g: 13.0, fatPer100g: 0.1, fiberPer100g: 1.4,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 165 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Papaya", category: "fruit", source: "usda",
    caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 11.0, fatPer100g: 0.3, fiberPer100g: 1.7,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 145 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Guava", category: "fruit", source: "usda",
    caloriesPer100g: 68, proteinPer100g: 2.6, carbsPer100g: 14.0, fatPer100g: 0.9, fiberPer100g: 5.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 165 }]),
    tags: ["vegetarian", "fruit"],
  },
  {
    name: "Pomegranate", category: "fruit", source: "usda",
    caloriesPer100g: 83, proteinPer100g: 1.7, carbsPer100g: 19.0, fatPer100g: 1.2, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 cup seeds", grams: 174 }]),
    tags: ["vegetarian", "fruit"],
  },

  // ── International Proteins (6) ──────────────────────────────────────
  {
    name: "Chicken Breast (raw)", category: "protein", source: "usda",
    caloriesPer100g: 165, proteinPer100g: 31.0, carbsPer100g: 0, fatPer100g: 3.6, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 breast", grams: 200 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Chicken Thigh (raw)", category: "protein", source: "usda",
    caloriesPer100g: 209, proteinPer100g: 26.0, carbsPer100g: 0, fatPer100g: 10.9, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 thigh", grams: 150 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Egg (whole, raw)", category: "protein", source: "usda",
    caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 11.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 egg", grams: 50 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Salmon (raw)", category: "protein", source: "usda",
    caloriesPer100g: 208, proteinPer100g: 20.0, carbsPer100g: 0, fatPer100g: 13.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 fillet", grams: 170 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Tuna (canned)", category: "protein", source: "usda",
    caloriesPer100g: 116, proteinPer100g: 26.0, carbsPer100g: 0, fatPer100g: 0.8, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 can", grams: 142 }]),
    tags: ["non-vegetarian", "high-protein"],
  },
  {
    name: "Tofu (firm)", category: "protein", source: "usda",
    caloriesPer100g: 144, proteinPer100g: 17.0, carbsPer100g: 3.0, fatPer100g: 8.7, fiberPer100g: 2.3,
    commonPortions: JSON.stringify([{ name: "1 block", grams: 200 }, { name: "1 cup cubes", grams: 250 }]),
    tags: ["vegetarian", "vegan", "high-protein"],
  },

  // ── International Grains & Bread (4) ────────────────────────────────
  {
    name: "Bread (White)", category: "grain", source: "usda",
    caloriesPer100g: 265, proteinPer100g: 9.0, carbsPer100g: 49.0, fatPer100g: 3.2, fiberPer100g: 2.7,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 30 }, { name: "2 slices", grams: 60 }]),
    tags: ["vegetarian", "staple"],
  },
  {
    name: "Bread (Whole Wheat)", category: "grain", source: "usda",
    caloriesPer100g: 247, proteinPer100g: 13.0, carbsPer100g: 41.0, fatPer100g: 3.4, fiberPer100g: 7.0,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 30 }, { name: "2 slices", grams: 60 }]),
    tags: ["vegetarian", "whole-grain", "staple"],
  },
  {
    name: "Pasta (cooked)", category: "grain", source: "usda",
    caloriesPer100g: 131, proteinPer100g: 5.0, carbsPer100g: 25.0, fatPer100g: 1.1, fiberPer100g: 1.8,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 140 }]),
    tags: ["vegetarian", "italian"],
  },
  {
    name: "Noodles (cooked)", category: "grain", source: "usda",
    caloriesPer100g: 138, proteinPer100g: 4.5, carbsPer100g: 25.0, fatPer100g: 2.1, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 160 }]),
    tags: ["vegetarian"],
  },

  // ── International Grains & Cereals (2) ──────────────────────────────
  {
    name: "Oats (dry)", category: "grain", source: "usda",
    caloriesPer100g: 389, proteinPer100g: 17.0, carbsPer100g: 66.0, fatPer100g: 6.9, fiberPer100g: 10.6,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 80 }, { name: "1/2 cup", grams: 40 }]),
    tags: ["vegetarian", "whole-grain", "high-fiber"],
  },
  {
    name: "Cornflakes", category: "grain", source: "usda",
    caloriesPer100g: 357, proteinPer100g: 7.5, carbsPer100g: 84.0, fatPer100g: 0.4, fiberPer100g: 1.3,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 30 }]),
    tags: ["vegetarian"],
  },

  // ── International Nuts & Seeds (6) ──────────────────────────────────
  {
    name: "Almonds", category: "nut", source: "usda",
    caloriesPer100g: 579, proteinPer100g: 21.0, carbsPer100g: 22.0, fatPer100g: 50.0, fiberPer100g: 12.5,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "high-protein", "healthy-fats"],
  },
  {
    name: "Cashews", category: "nut", source: "usda",
    caloriesPer100g: 553, proteinPer100g: 18.0, carbsPer100g: 30.0, fatPer100g: 44.0, fiberPer100g: 3.3,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "high-protein"],
  },
  {
    name: "Peanuts", category: "nut", source: "usda",
    caloriesPer100g: 567, proteinPer100g: 26.0, carbsPer100g: 16.0, fatPer100g: 49.0, fiberPer100g: 8.5,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "high-protein"],
  },
  {
    name: "Walnuts", category: "nut", source: "usda",
    caloriesPer100g: 654, proteinPer100g: 15.0, carbsPer100g: 14.0, fatPer100g: 65.0, fiberPer100g: 6.7,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "healthy-fats"],
  },
  {
    name: "Peanut Butter", category: "nut", source: "usda",
    caloriesPer100g: 588, proteinPer100g: 25.0, carbsPer100g: 20.0, fatPer100g: 50.0, fiberPer100g: 6.0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 16 }]),
    tags: ["vegetarian", "high-protein"],
  },
  {
    name: "Coconut (fresh)", category: "nut", source: "usda",
    caloriesPer100g: 354, proteinPer100g: 3.3, carbsPer100g: 15.0, fatPer100g: 33.0, fiberPer100g: 9.0,
    commonPortions: JSON.stringify([{ name: "1 cup shredded", grams: 80 }]),
    tags: ["vegetarian"],
  },

  // ── Oils & Fats (2) ────────────────────────────────────────────────
  {
    name: "Olive Oil", category: "oil", source: "usda",
    caloriesPer100g: 884, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 14 }]),
    tags: ["vegetarian", "healthy-fats"],
  },
  {
    name: "Coconut Oil", category: "oil", source: "usda",
    caloriesPer100g: 862, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 14 }]),
    tags: ["vegetarian"],
  },

  // ── Sweeteners & Condiments (2) ─────────────────────────────────────
  {
    name: "Honey", category: "condiment", source: "usda",
    caloriesPer100g: 304, proteinPer100g: 0.3, carbsPer100g: 82.0, fatPer100g: 0, fiberPer100g: 0.2,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 21 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Sugar", category: "condiment", source: "usda",
    caloriesPer100g: 387, proteinPer100g: 0, carbsPer100g: 100.0, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 4 }]),
    tags: ["vegetarian"],
  },

  // ── Spices (10) ─────────────────────────────────────────────────────
  {
    name: "Salt", category: "spice", source: "usda",
    caloriesPer100g: 0, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 6 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Black Pepper", category: "spice", source: "usda",
    caloriesPer100g: 251, proteinPer100g: 10.0, carbsPer100g: 64.0, fatPer100g: 3.3, fiberPer100g: 25.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Turmeric", category: "spice", source: "usda",
    caloriesPer100g: 312, proteinPer100g: 9.7, carbsPer100g: 67.0, fatPer100g: 3.3, fiberPer100g: 21.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 3 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Cumin", category: "spice", source: "usda",
    caloriesPer100g: 375, proteinPer100g: 18.0, carbsPer100g: 44.0, fatPer100g: 22.0, fiberPer100g: 11.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Coriander Powder", category: "spice", source: "usda",
    caloriesPer100g: 298, proteinPer100g: 12.0, carbsPer100g: 55.0, fatPer100g: 12.0, fiberPer100g: 42.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Garam Masala", category: "spice", source: "ifct",
    caloriesPer100g: 379, proteinPer100g: 10.0, carbsPer100g: 50.0, fatPer100g: 15.0, fiberPer100g: 18.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Red Chilli Powder", category: "spice", source: "usda",
    caloriesPer100g: 282, proteinPer100g: 12.0, carbsPer100g: 49.0, fatPer100g: 14.0, fiberPer100g: 27.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Mustard Seeds", category: "spice", source: "usda",
    caloriesPer100g: 508, proteinPer100g: 26.0, carbsPer100g: 28.0, fatPer100g: 36.0, fiberPer100g: 12.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 3 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Sesame Seeds", category: "spice", source: "usda",
    caloriesPer100g: 573, proteinPer100g: 18.0, carbsPer100g: 23.0, fatPer100g: 50.0, fiberPer100g: 12.0,
    commonPortions: JSON.stringify([{ name: "1 tbsp", grams: 9 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Cumin Seeds", category: "spice", source: "usda",
    caloriesPer100g: 375, proteinPer100g: 18.0, carbsPer100g: 44.0, fatPer100g: 22.0, fiberPer100g: 11.0,
    commonPortions: JSON.stringify([{ name: "1 tsp", grams: 2 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── International Raw Vegetables (6) ────────────────────────────────
  {
    name: "Onion (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 40, proteinPer100g: 1.1, carbsPer100g: 9.3, fatPer100g: 0.1, fiberPer100g: 1.7,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Tomato (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 18, proteinPer100g: 0.9, carbsPer100g: 3.9, fatPer100g: 0.2, fiberPer100g: 1.2,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Potato (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 77, proteinPer100g: 2.0, carbsPer100g: 17.0, fatPer100g: 0.1, fiberPer100g: 2.2,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Carrot (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 41, proteinPer100g: 0.9, carbsPer100g: 10.0, fatPer100g: 0.2, fiberPer100g: 2.8,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 60 }]),
    tags: ["vegetarian", "raw"],
  },
  {
    name: "Cucumber", category: "vegetable", source: "usda",
    caloriesPer100g: 15, proteinPer100g: 0.7, carbsPer100g: 3.6, fatPer100g: 0.1, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 200 }]),
    tags: ["vegetarian", "raw", "low-calorie"],
  },
  {
    name: "Lettuce", category: "vegetable", source: "usda",
    caloriesPer100g: 15, proteinPer100g: 1.4, carbsPer100g: 2.9, fatPer100g: 0.2, fiberPer100g: 1.3,
    commonPortions: JSON.stringify([{ name: "1 cup shredded", grams: 36 }]),
    tags: ["vegetarian", "raw", "low-calorie"],
  },

  // ── International Extras (3) ────────────────────────────────────────
  {
    name: "Avocado", category: "fruit", source: "usda",
    caloriesPer100g: 160, proteinPer100g: 2.0, carbsPer100g: 9.0, fatPer100g: 15.0, fiberPer100g: 7.0,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian", "healthy-fats"],
  },
  {
    name: "Broccoli (raw)", category: "vegetable", source: "usda",
    caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 6.6, fatPer100g: 0.4, fiberPer100g: 2.6,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 90 }]),
    tags: ["vegetarian", "raw", "low-calorie"],
  },
  {
    name: "Sweet Potato (cooked)", category: "vegetable", source: "usda",
    caloriesPer100g: 90, proteinPer100g: 2.0, carbsPer100g: 21.0, fatPer100g: 0.1, fiberPer100g: 3.3,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian"],
  },

  // ── Tempeh ──────────────────────────────────────────────────────────
  {
    name: "Tempeh", category: "protein", source: "usda",
    caloriesPer100g: 192, proteinPer100g: 20.0, carbsPer100g: 8.0, fatPer100g: 11.0, fiberPer100g: 11.0,
    commonPortions: JSON.stringify([{ name: "1 block", grams: 150 }]),
    tags: ["vegetarian", "vegan", "high-protein", "fermented"],
  },

  // ── Indian Curries & Gravies (25) ──────────────────────────────────────
  {
    name: "Paneer Butter Masala", category: "prepared", source: "ifct",
    caloriesPer100g: 250, proteinPer100g: 10.0, carbsPer100g: 12.0, fatPer100g: 18.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi", "rich"],
  },
  {
    name: "Chicken Tikka Masala", category: "meat", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 18.0, carbsPer100g: 8.0, fatPer100g: 13.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "punjabi"],
  },
  {
    name: "Chicken Vindaloo", category: "meat", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 16.0, carbsPer100g: 6.0, fatPer100g: 10.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "goan", "spicy"],
  },
  {
    name: "Fish Curry", category: "meat", source: "ifct",
    caloriesPer100g: 150, proteinPer100g: 15.0, carbsPer100g: 4.0, fatPer100g: 8.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Mutton Rogan Josh", category: "meat", source: "ifct",
    caloriesPer100g: 230, proteinPer100g: 20.0, carbsPer100g: 5.0, fatPer100g: 14.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "kashmiri"],
  },
  {
    name: "Egg Curry", category: "meat", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 10.0, carbsPer100g: 6.0, fatPer100g: 11.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Egg Bhurji", category: "meat", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 12.0, carbsPer100g: 4.0, fatPer100g: 13.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Butter Chicken", category: "meat", source: "ifct",
    caloriesPer100g: 240, proteinPer100g: 18.0, carbsPer100g: 8.0, fatPer100g: 15.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "punjabi", "rich"],
  },
  {
    name: "Chicken Korma", category: "meat", source: "ifct",
    caloriesPer100g: 210, proteinPer100g: 16.0, carbsPer100g: 7.0, fatPer100g: 13.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "mughlai"],
  },
  {
    name: "Palak Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 10.0, carbsPer100g: 8.0, fatPer100g: 12.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Shahi Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 260, proteinPer100g: 11.0, carbsPer100g: 10.0, fatPer100g: 20.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "mughlai"],
  },
  {
    name: "Kadai Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 10.0, carbsPer100g: 10.0, fatPer100g: 16.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Matar Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 190, proteinPer100g: 10.0, carbsPer100g: 10.0, fatPer100g: 13.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Aloo Gobi", category: "prepared", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 3.0, carbsPer100g: 16.0, fatPer100g: 5.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Aloo Matar", category: "prepared", source: "ifct",
    caloriesPer100g: 110, proteinPer100g: 3.0, carbsPer100g: 15.0, fatPer100g: 4.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Bhindi Masala", category: "prepared", source: "ifct",
    caloriesPer100g: 100, proteinPer100g: 2.5, carbsPer100g: 10.0, fatPer100g: 5.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Baingan Bharta", category: "prepared", source: "ifct",
    caloriesPer100g: 90, proteinPer100g: 2.0, carbsPer100g: 10.0, fatPer100g: 4.5, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Jeera Aloo", category: "prepared", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 2.5, carbsPer100g: 18.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Rajma Masala", category: "prepared", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 7.0, carbsPer100g: 18.0, fatPer100g: 3.0, fiberPer100g: 5.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Chole Masala", category: "prepared", source: "ifct",
    caloriesPer100g: 150, proteinPer100g: 7.0, carbsPer100g: 20.0, fatPer100g: 4.0, fiberPer100g: 6.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Kadhi Pakora", category: "prepared", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 5.0, carbsPer100g: 12.0, fatPer100g: 8.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Dal Tadka", category: "legume", source: "ifct",
    caloriesPer100g: 100, proteinPer100g: 6.0, carbsPer100g: 14.0, fatPer100g: 2.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Sambar", category: "prepared", source: "ifct",
    caloriesPer100g: 80, proteinPer100g: 4.0, carbsPer100g: 10.0, fatPer100g: 2.5, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Rasam", category: "beverage", source: "ifct",
    caloriesPer100g: 30, proteinPer100g: 1.0, carbsPer100g: 5.0, fatPer100g: 0.5, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },

  // ── Indian Breads (10) ──────────────────────────────────────────────────
  {
    name: "Butter Naan", category: "grain", source: "ifct",
    caloriesPer100g: 310, proteinPer100g: 8.0, carbsPer100g: 45.0, fatPer100g: 10.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 75 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Garlic Naan", category: "grain", source: "ifct",
    caloriesPer100g: 300, proteinPer100g: 8.0, carbsPer100g: 44.0, fatPer100g: 9.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 75 }]),
    tags: ["vegetarian", "indian", "punjabi"],
  },
  {
    name: "Lachha Paratha", category: "grain", source: "ifct",
    caloriesPer100g: 330, proteinPer100g: 7.0, carbsPer100g: 42.0, fatPer100g: 15.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 100 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Aloo Paratha", category: "grain", source: "ifct",
    caloriesPer100g: 290, proteinPer100g: 6.0, carbsPer100g: 40.0, fatPer100g: 12.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 100 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Puri", category: "grain", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 7.0, carbsPer100g: 45.0, fatPer100g: 16.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 35 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Bhatura", category: "grain", source: "ifct",
    caloriesPer100g: 340, proteinPer100g: 7.0, carbsPer100g: 48.0, fatPer100g: 14.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Roomali Roti", category: "grain", source: "ifct",
    caloriesPer100g: 260, proteinPer100g: 7.0, carbsPer100g: 48.0, fatPer100g: 4.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 40 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Missi Roti", category: "grain", source: "ifct",
    caloriesPer100g: 280, proteinPer100g: 10.0, carbsPer100g: 40.0, fatPer100g: 8.0, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 60 }]),
    tags: ["vegetarian", "indian"],
  },

  // ── Indian Snacks & Street Food (15) ──────────────────────────────────
  {
    name: "Dhokla", category: "snack", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 4.0, carbsPer100g: 18.0, fatPer100g: 3.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }, { name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "gujarati"],
  },
  {
    name: "Green Chili", category: "vegetable", source: "usda",
    caloriesPer100g: 40, proteinPer100g: 2.0, carbsPer100g: 8.0, fatPer100g: 0.5, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 10 }]),
    tags: ["vegetarian", "indian", "spice"],
  },
  {
    name: "Pani Puri", category: "snack", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 4.0, carbsPer100g: 30.0, fatPer100g: 8.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate (6 pcs)", grams: 120 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Bhel Puri", category: "snack", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 4.0, carbsPer100g: 28.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Sev Puri", category: "snack", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 5.0, carbsPer100g: 28.0, fatPer100g: 10.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Dahi Puri", category: "snack", source: "ifct",
    caloriesPer100g: 190, proteinPer100g: 5.0, carbsPer100g: 26.0, fatPer100g: 7.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate (6 pcs)", grams: 140 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Aloo Tikki", category: "snack", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 4.0, carbsPer100g: 25.0, fatPer100g: 9.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Aloo Tikki Chat", category: "snack", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 4.0, carbsPer100g: 24.0, fatPer100g: 7.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 150 }]),
    tags: ["vegetarian", "indian", "street-food"],
  },
  {
    name: "Pav Bhaji", category: "prepared", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 5.0, carbsPer100g: 28.0, fatPer100g: 8.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 300 }]),
    tags: ["vegetarian", "indian", "maharashtrian"],
  },
  {
    name: "Vada Pav", category: "snack", source: "ifct",
    caloriesPer100g: 250, proteinPer100g: 5.5, carbsPer100g: 32.0, fatPer100g: 11.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 150 }]),
    tags: ["vegetarian", "indian", "maharashtrian"],
  },
  {
    name: "Dabeli", category: "snack", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 5.0, carbsPer100g: 30.0, fatPer100g: 9.0, fiberPer100g: 2.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 120 }]),
    tags: ["vegetarian", "indian", "gujarati"],
  },
  {
    name: "Kachori", category: "snack", source: "ifct",
    caloriesPer100g: 320, proteinPer100g: 6.0, carbsPer100g: 35.0, fatPer100g: 17.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "snack"],
  },
  {
    name: "Mirchi Bajji", category: "snack", source: "ifct",
    caloriesPer100g: 210, proteinPer100g: 4.0, carbsPer100g: 22.0, fatPer100g: 12.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 60 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Bonda", category: "snack", source: "ifct",
    caloriesPer100g: 240, proteinPer100g: 5.0, carbsPer100g: 28.0, fatPer100g: 12.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 60 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Punugulu", category: "snack", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 5.0, carbsPer100g: 26.0, fatPer100g: 11.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 40 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },

  // ── Indian Rice Dishes (10) ─────────────────────────────────────────────
  {
    name: "Veg Biryani", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 4.0, carbsPer100g: 25.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Chicken Biryani", category: "prepared", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 10.0, carbsPer100g: 24.0, fatPer100g: 7.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Mutton Biryani", category: "prepared", source: "ifct",
    caloriesPer100g: 220, proteinPer100g: 12.0, carbsPer100g: 22.0, fatPer100g: 9.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["non-vegetarian", "indian"],
  },
  {
    name: "Egg Fried Rice", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 6.0, carbsPer100g: 24.0, fatPer100g: 6.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Veg Pulao", category: "prepared", source: "ifct",
    caloriesPer100g: 150, proteinPer100g: 3.0, carbsPer100g: 24.0, fatPer100g: 4.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Lemon Rice", category: "prepared", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 3.0, carbsPer100g: 26.0, fatPer100g: 5.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Tamarind Rice", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 3.5, carbsPer100g: 26.0, fatPer100g: 5.5, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Curd Rice", category: "prepared", source: "ifct",
    caloriesPer100g: 120, proteinPer100g: 4.0, carbsPer100g: 18.0, fatPer100g: 3.5, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Coconut Rice", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 3.5, carbsPer100g: 25.0, fatPer100g: 7.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Pongal", category: "prepared", source: "ifct",
    caloriesPer100g: 130, proteinPer100g: 4.0, carbsPer100g: 20.0, fatPer100g: 3.5, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },

  // ── South Indian (10) ──────────────────────────────────────────────────
  {
    name: "Masala Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 4.0, carbsPer100g: 22.0, fatPer100g: 6.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 170 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Rava Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 4.0, carbsPer100g: 24.0, fatPer100g: 6.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 120 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Onion Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 165, proteinPer100g: 4.0, carbsPer100g: 23.0, fatPer100g: 6.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 130 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Cheese Dosa", category: "prepared", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 7.0, carbsPer100g: 22.0, fatPer100g: 9.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Idli Sambar", category: "prepared", source: "ifct",
    caloriesPer100g: 90, proteinPer100g: 3.5, carbsPer100g: 14.0, fatPer100g: 1.5, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "2 idli + sambar", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Medu Vada Sambar", category: "prepared", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 5.0, carbsPer100g: 16.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "2 vada + sambar", grams: 200 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Uttapam", category: "prepared", source: "ifct",
    caloriesPer100g: 150, proteinPer100g: 4.0, carbsPer100g: 22.0, fatPer100g: 5.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 120 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Appam", category: "grain", source: "ifct",
    caloriesPer100g: 140, proteinPer100g: 3.0, carbsPer100g: 24.0, fatPer100g: 3.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 60 }]),
    tags: ["vegetarian", "indian", "kerala"],
  },
  {
    name: "Puttu", category: "grain", source: "ifct",
    caloriesPer100g: 160, proteinPer100g: 3.0, carbsPer100g: 30.0, fatPer100g: 3.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 cylinder", grams: 100 }]),
    tags: ["vegetarian", "indian", "kerala"],
  },
  {
    name: "Malabar Parotta", category: "grain", source: "ifct",
    caloriesPer100g: 320, proteinPer100g: 6.0, carbsPer100g: 44.0, fatPer100g: 13.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "kerala"],
  },

  // ── Indian Sweets (10) ──────────────────────────────────────────────────
  {
    name: "Gulab Jamun", category: "snack", source: "ifct",
    caloriesPer100g: 320, proteinPer100g: 4.0, carbsPer100g: 50.0, fatPer100g: 12.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 40 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Rasgulla", category: "snack", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 4.0, carbsPer100g: 35.0, fatPer100g: 2.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 50 }]),
    tags: ["vegetarian", "indian", "sweet", "bengali"],
  },
  {
    name: "Jalebi", category: "snack", source: "ifct",
    caloriesPer100g: 310, proteinPer100g: 3.0, carbsPer100g: 55.0, fatPer100g: 9.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 30 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Rasmalai", category: "snack", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 6.0, carbsPer100g: 28.0, fatPer100g: 7.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Kheer", category: "snack", source: "ifct",
    caloriesPer100g: 150, proteinPer100g: 4.0, carbsPer100g: 22.0, fatPer100g: 5.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Halwa", category: "snack", source: "ifct",
    caloriesPer100g: 280, proteinPer100g: 4.0, carbsPer100g: 40.0, fatPer100g: 12.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Barfi", category: "snack", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 5.0, carbsPer100g: 45.0, fatPer100g: 17.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 25 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Ladoo", category: "snack", source: "ifct",
    caloriesPer100g: 350, proteinPer100g: 5.0, carbsPer100g: 50.0, fatPer100g: 15.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 40 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Pedha", category: "snack", source: "ifct",
    caloriesPer100g: 330, proteinPer100g: 5.0, carbsPer100g: 42.0, fatPer100g: 16.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 20 }]),
    tags: ["vegetarian", "indian", "sweet"],
  },
  {
    name: "Mysore Pak", category: "snack", source: "ifct",
    caloriesPer100g: 400, proteinPer100g: 4.0, carbsPer100g: 45.0, fatPer100g: 24.0, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 30 }]),
    tags: ["vegetarian", "indian", "sweet", "south-indian"],
  },

  // ── Indo-Chinese (8) ──────────────────────────────────────────────────
  {
    name: "Veg Manchurian", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 4.0, carbsPer100g: 20.0, fatPer100g: 8.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Chicken Manchurian", category: "meat", source: "ifct",
    caloriesPer100g: 190, proteinPer100g: 12.0, carbsPer100g: 14.0, fatPer100g: 9.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Chilli Paneer", category: "prepared", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 8.0, carbsPer100g: 16.0, fatPer100g: 12.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Chilli Chicken", category: "meat", source: "ifct",
    caloriesPer100g: 210, proteinPer100g: 14.0, carbsPer100g: 12.0, fatPer100g: 12.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Hakka Noodles", category: "prepared", source: "ifct",
    caloriesPer100g: 170, proteinPer100g: 5.0, carbsPer100g: 24.0, fatPer100g: 6.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Schezwan Noodles", category: "prepared", source: "ifct",
    caloriesPer100g: 180, proteinPer100g: 5.0, carbsPer100g: 25.0, fatPer100g: 7.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Veg Spring Roll", category: "snack", source: "ifct",
    caloriesPer100g: 230, proteinPer100g: 4.0, carbsPer100g: 26.0, fatPer100g: 12.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 piece", grams: 80 }]),
    tags: ["vegetarian", "indian", "indo-chinese"],
  },
  {
    name: "Chicken Momos", category: "snack", source: "ifct",
    caloriesPer100g: 200, proteinPer100g: 10.0, carbsPer100g: 22.0, fatPer100g: 8.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 plate (8 pcs)", grams: 200 }]),
    tags: ["non-vegetarian", "indian", "tibetan"],
  },

  // ── Common International (10) ──────────────────────────────────────────
  {
    name: "Margherita Pizza", category: "prepared", source: "usda",
    caloriesPer100g: 250, proteinPer100g: 11.0, carbsPer100g: 30.0, fatPer100g: 10.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 130 }, { name: "1 medium pizza", grams: 550 }]),
    tags: ["vegetarian", "italian"],
  },
  {
    name: "Chicken Burger", category: "prepared", source: "usda",
    caloriesPer100g: 250, proteinPer100g: 14.0, carbsPer100g: 24.0, fatPer100g: 10.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 burger", grams: 220 }]),
    tags: ["non-vegetarian", "fast-food"],
  },
  {
    name: "Veg Burger", category: "prepared", source: "usda",
    caloriesPer100g: 230, proteinPer100g: 6.0, carbsPer100g: 30.0, fatPer100g: 9.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 burger", grams: 200 }]),
    tags: ["vegetarian", "fast-food"],
  },
  {
    name: "Chicken Sandwich", category: "prepared", source: "usda",
    caloriesPer100g: 220, proteinPer100g: 12.0, carbsPer100g: 22.0, fatPer100g: 9.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 sandwich", grams: 180 }]),
    tags: ["non-vegetarian"],
  },
  {
    name: "Caesar Salad", category: "prepared", source: "usda",
    caloriesPer100g: 120, proteinPer100g: 5.0, carbsPer100g: 8.0, fatPer100g: 8.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 250 }]),
    tags: ["vegetarian", "salad"],
  },
  {
    name: "Pasta Alfredo", category: "prepared", source: "usda",
    caloriesPer100g: 200, proteinPer100g: 8.0, carbsPer100g: 22.0, fatPer100g: 9.0, fiberPer100g: 1.5,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "italian"],
  },
  {
    name: "Pasta Arrabiata", category: "prepared", source: "usda",
    caloriesPer100g: 160, proteinPer100g: 5.0, carbsPer100g: 26.0, fatPer100g: 4.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 plate", grams: 250 }]),
    tags: ["vegetarian", "italian"],
  },
  {
    name: "French Fries", category: "snack", source: "usda",
    caloriesPer100g: 310, proteinPer100g: 3.5, carbsPer100g: 40.0, fatPer100g: 15.0, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 serving", grams: 120 }]),
    tags: ["vegetarian", "fast-food"],
  },
  {
    name: "Chicken Nuggets", category: "snack", source: "usda",
    caloriesPer100g: 280, proteinPer100g: 15.0, carbsPer100g: 18.0, fatPer100g: 16.0, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 serving (6 pcs)", grams: 100 }]),
    tags: ["non-vegetarian", "fast-food"],
  },
  {
    name: "Chocolate Cake", category: "snack", source: "usda",
    caloriesPer100g: 370, proteinPer100g: 5.0, carbsPer100g: 50.0, fatPer100g: 18.0, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 80 }]),
    tags: ["vegetarian", "dessert"],
  },

  // ── Beverages & Drinks (10) ────────────────────────────────────────────
  {
    name: "Masala Chai", category: "beverage", source: "ifct",
    caloriesPer100g: 40, proteinPer100g: 1.0, carbsPer100g: 6.0, fatPer100g: 1.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Filter Coffee", category: "beverage", source: "ifct",
    caloriesPer100g: 35, proteinPer100g: 1.0, carbsPer100g: 5.0, fatPer100g: 1.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "indian", "south-indian"],
  },
  {
    name: "Sweet Lassi", category: "beverage", source: "ifct",
    caloriesPer100g: 90, proteinPer100g: 3.5, carbsPer100g: 14.0, fatPer100g: 2.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Mango Lassi", category: "beverage", source: "ifct",
    caloriesPer100g: 100, proteinPer100g: 3.0, carbsPer100g: 16.0, fatPer100g: 2.5, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Buttermilk", category: "beverage", source: "ifct",
    caloriesPer100g: 25, proteinPer100g: 1.5, carbsPer100g: 3.0, fatPer100g: 0.5, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Jaljeera", category: "beverage", source: "ifct",
    caloriesPer100g: 30, proteinPer100g: 0.5, carbsPer100g: 6.0, fatPer100g: 0.2, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Thandai", category: "beverage", source: "ifct",
    caloriesPer100g: 90, proteinPer100g: 3.0, carbsPer100g: 12.0, fatPer100g: 3.5, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Nimbu Pani", category: "beverage", source: "ifct",
    caloriesPer100g: 40, proteinPer100g: 0.2, carbsPer100g: 10.0, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 250 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Coconut Water", category: "beverage", source: "usda",
    caloriesPer100g: 19, proteinPer100g: 0.7, carbsPer100g: 3.7, fatPer100g: 0.2, fiberPer100g: 1.1,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Cold Coffee", category: "beverage", source: "usda",
    caloriesPer100g: 80, proteinPer100g: 2.0, carbsPer100g: 12.0, fatPer100g: 3.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 glass", grams: 300 }]),
    tags: ["vegetarian"],
  },

  // ── Protein Sources (8) ────────────────────────────────────────────────
  {
    name: "Tofu", category: "dairy", source: "usda",
    caloriesPer100g: 76, proteinPer100g: 8.0, carbsPer100g: 2.0, fatPer100g: 4.8, fiberPer100g: 0.3,
    commonPortions: JSON.stringify([{ name: "1 block", grams: 150 }]),
    tags: ["vegetarian", "vegan", "high-protein"],
  },
  {
    name: "Peanut Butter", category: "condiment", source: "usda",
    caloriesPer100g: 590, proteinPer100g: 25.0, carbsPer100g: 20.0, fatPer100g: 50.0, fiberPer100g: 6.0,
    commonPortions: JSON.stringify([{ name: "1 tablespoon", grams: 32 }]),
    tags: ["vegetarian", "vegan", "high-protein"],
  },
  {
    name: "Almonds", category: "snack", source: "usda",
    caloriesPer100g: 580, proteinPer100g: 21.0, carbsPer100g: 22.0, fatPer100g: 50.0, fiberPer100g: 12.0,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "vegan", "healthy-fats"],
  },
  {
    name: "Cashews", category: "snack", source: "usda",
    caloriesPer100g: 550, proteinPer100g: 18.0, carbsPer100g: 30.0, fatPer100g: 44.0, fiberPer100g: 3.0,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Peanuts", category: "snack", source: "usda",
    caloriesPer100g: 570, proteinPer100g: 26.0, carbsPer100g: 16.0, fatPer100g: 49.0, fiberPer100g: 9.0,
    commonPortions: JSON.stringify([{ name: "1 handful", grams: 30 }]),
    tags: ["vegetarian", "vegan", "high-protein"],
  },
  {
    name: "Soya Chunks", category: "legume", source: "ifct",
    caloriesPer100g: 340, proteinPer100g: 52.0, carbsPer100g: 33.0, fatPer100g: 0.5, fiberPer100g: 13.0,
    commonPortions: JSON.stringify([{ name: "1 cup cooked", grams: 100 }]),
    tags: ["vegetarian", "vegan", "high-protein"],
  },
  {
    name: "Sprouts", category: "legume", source: "ifct",
    caloriesPer100g: 80, proteinPer100g: 7.0, carbsPer100g: 12.0, fatPer100g: 0.5, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 bowl", grams: 150 }]),
    tags: ["vegetarian", "vegan", "healthy"],
  },
  {
    name: "Boiled Eggs", category: "meat", source: "usda",
    caloriesPer100g: 155, proteinPer100g: 13.0, carbsPer100g: 1.1, fatPer100g: 11.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 egg", grams: 50 }, { name: "2 eggs", grams: 100 }]),
    tags: ["non-vegetarian", "high-protein"],
  },

  // ── Fruits (10) ────────────────────────────────────────────────────────
  {
    name: "Banana", category: "fruit", source: "usda",
    caloriesPer100g: 89, proteinPer100g: 1.1, carbsPer100g: 23.0, fatPer100g: 0.3, fiberPer100g: 2.6,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Apple", category: "fruit", source: "usda",
    caloriesPer100g: 52, proteinPer100g: 0.3, carbsPer100g: 14.0, fatPer100g: 0.2, fiberPer100g: 2.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 180 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Mango", category: "fruit", source: "usda",
    caloriesPer100g: 60, proteinPer100g: 0.8, carbsPer100g: 15.0, fatPer100g: 0.4, fiberPer100g: 1.6,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 200 }]),
    tags: ["vegetarian", "vegan", "indian"],
  },
  {
    name: "Orange", category: "fruit", source: "usda",
    caloriesPer100g: 47, proteinPer100g: 0.9, carbsPer100g: 12.0, fatPer100g: 0.1, fiberPer100g: 2.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Watermelon", category: "fruit", source: "usda",
    caloriesPer100g: 30, proteinPer100g: 0.6, carbsPer100g: 8.0, fatPer100g: 0.2, fiberPer100g: 0.4,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 280 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Grapes", category: "fruit", source: "usda",
    caloriesPer100g: 69, proteinPer100g: 0.7, carbsPer100g: 18.0, fatPer100g: 0.2, fiberPer100g: 0.9,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Pineapple", category: "fruit", source: "usda",
    caloriesPer100g: 50, proteinPer100g: 0.5, carbsPer100g: 13.0, fatPer100g: 0.1, fiberPer100g: 1.4,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 165 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Papaya", category: "fruit", source: "usda",
    caloriesPer100g: 43, proteinPer100g: 0.5, carbsPer100g: 11.0, fatPer100g: 0.3, fiberPer100g: 1.7,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 145 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Guava", category: "fruit", source: "usda",
    caloriesPer100g: 68, proteinPer100g: 2.6, carbsPer100g: 14.0, fatPer100g: 1.0, fiberPer100g: 5.4,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 100 }]),
    tags: ["vegetarian", "vegan", "indian"],
  },
  {
    name: "Pomegranate", category: "fruit", source: "usda",
    caloriesPer100g: 83, proteinPer100g: 1.7, carbsPer100g: 19.0, fatPer100g: 1.2, fiberPer100g: 4.0,
    commonPortions: JSON.stringify([{ name: "1 cup seeds", grams: 174 }]),
    tags: ["vegetarian", "vegan"],
  },

  // ── Dairy & Extras (6) ────────────────────────────────────────────────
  {
    name: "Cheese", category: "dairy", source: "usda",
    caloriesPer100g: 400, proteinPer100g: 25.0, carbsPer100g: 1.3, fatPer100g: 33.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 slice", grams: 28 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Butter", category: "dairy", source: "usda",
    caloriesPer100g: 720, proteinPer100g: 0.9, carbsPer100g: 0.1, fatPer100g: 81.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tablespoon", grams: 14 }]),
    tags: ["vegetarian"],
  },
  {
    name: "Ghee", category: "dairy", source: "ifct",
    caloriesPer100g: 900, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tablespoon", grams: 15 }]),
    tags: ["vegetarian", "indian"],
  },
  {
    name: "Honey", category: "condiment", source: "usda",
    caloriesPer100g: 304, proteinPer100g: 0.3, carbsPer100g: 82.0, fatPer100g: 0, fiberPer100g: 0.2,
    commonPortions: JSON.stringify([{ name: "1 tablespoon", grams: 21 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Sugar", category: "condiment", source: "usda",
    caloriesPer100g: 387, proteinPer100g: 0, carbsPer100g: 100.0, fatPer100g: 0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 teaspoon", grams: 4 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Oil", category: "condiment", source: "usda",
    caloriesPer100g: 880, proteinPer100g: 0, carbsPer100g: 0, fatPer100g: 100.0, fiberPer100g: 0,
    commonPortions: JSON.stringify([{ name: "1 tablespoon", grams: 14 }]),
    tags: ["vegetarian", "vegan"],
  },

  // ── Vegetables (12) ────────────────────────────────────────────────────
  {
    name: "Broccoli", category: "vegetable", source: "usda",
    caloriesPer100g: 34, proteinPer100g: 2.8, carbsPer100g: 7.0, fatPer100g: 0.4, fiberPer100g: 2.6,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 90 }]),
    tags: ["vegetarian", "vegan", "low-calorie"],
  },
  {
    name: "Spinach", category: "vegetable", source: "usda",
    caloriesPer100g: 23, proteinPer100g: 2.9, carbsPer100g: 3.6, fatPer100g: 0.4, fiberPer100g: 2.2,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 30 }]),
    tags: ["vegetarian", "vegan", "low-calorie"],
  },
  {
    name: "Mushroom", category: "vegetable", source: "usda",
    caloriesPer100g: 22, proteinPer100g: 3.1, carbsPer100g: 3.3, fatPer100g: 0.3, fiberPer100g: 1.0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 70 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Sweet Corn", category: "vegetable", source: "usda",
    caloriesPer100g: 86, proteinPer100g: 3.2, carbsPer100g: 19.0, fatPer100g: 1.2, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 150 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Green Peas", category: "vegetable", source: "usda",
    caloriesPer100g: 81, proteinPer100g: 5.4, carbsPer100g: 14.0, fatPer100g: 0.4, fiberPer100g: 5.1,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 145 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Carrot", category: "vegetable", source: "usda",
    caloriesPer100g: 41, proteinPer100g: 0.9, carbsPer100g: 10.0, fatPer100g: 0.2, fiberPer100g: 2.8,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 60 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Cauliflower", category: "vegetable", source: "usda",
    caloriesPer100g: 25, proteinPer100g: 1.9, carbsPer100g: 5.0, fatPer100g: 0.3, fiberPer100g: 2.0,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 100 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Capsicum", category: "vegetable", source: "usda",
    caloriesPer100g: 31, proteinPer100g: 1.0, carbsPer100g: 6.0, fatPer100g: 0.3, fiberPer100g: 2.1,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 120 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Cucumber", category: "vegetable", source: "usda",
    caloriesPer100g: 16, proteinPer100g: 0.7, carbsPer100g: 3.6, fatPer100g: 0.1, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 200 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Beetroot", category: "vegetable", source: "usda",
    caloriesPer100g: 43, proteinPer100g: 1.6, carbsPer100g: 10.0, fatPer100g: 0.2, fiberPer100g: 2.8,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 80 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Pumpkin", category: "vegetable", source: "usda",
    caloriesPer100g: 26, proteinPer100g: 1.0, carbsPer100g: 6.5, fatPer100g: 0.1, fiberPer100g: 0.5,
    commonPortions: JSON.stringify([{ name: "1 cup", grams: 115 }]),
    tags: ["vegetarian", "vegan"],
  },
  {
    name: "Potato", category: "vegetable", source: "usda",
    caloriesPer100g: 77, proteinPer100g: 2.0, carbsPer100g: 17.0, fatPer100g: 0.1, fiberPer100g: 2.2,
    commonPortions: JSON.stringify([{ name: "1 medium", grams: 150 }]),
    tags: ["vegetarian", "vegan"],
  },
];

async function main() {
  console.log(`Seeding ${foods.length} foods...`);

  // Delete existing data
  await prisma.mealItem.deleteMany();
  await prisma.meal.deleteMany();
  await prisma.food.deleteMany();

  // Insert foods in batches
  const batchSize = 50;
  for (let i = 0; i < foods.length; i += batchSize) {
    const batch = foods.slice(i, i + batchSize);
    await prisma.food.createMany({ data: batch });
    console.log(`  Inserted batch ${Math.floor(i / batchSize) + 1}`);
  }

  const count = await prisma.food.count();
  console.log(`Seeding complete. Total foods in database: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
