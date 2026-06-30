"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";

export interface MealItemInput {
  foodId?: string;
  foodName: string;
  portionGrams: number;
  estimatedBy: "ai" | "user";
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export async function saveMeal(params: {
  photoUrl?: string;
  timeOfDay: string;
  items: MealItemInput[];
  aiModelUsed?: string;
  aiRawResponse?: unknown;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) throw new Error("User not found");

  const totals = params.items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      proteinG: acc.proteinG + item.proteinG,
      carbsG: acc.carbsG + item.carbsG,
      fatG: acc.fatG + item.fatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );

  const meal = await prisma.meal.create({
    data: {
      userId: user.id,
      photoUrl: params.photoUrl,
      timeOfDay: params.timeOfDay,
      totalCalories: totals.calories,
      totalProteinG: totals.proteinG,
      totalCarbsG: totals.carbsG,
      totalFatG: totals.fatG,
      aiModelUsed: params.aiModelUsed,
      aiRawResponse: params.aiRawResponse ?? undefined,
      items: {
        create: params.items.map((item) => ({
          foodId: item.foodId,
          foodName: item.foodName,
          portionGrams: item.portionGrams,
          estimatedBy: item.estimatedBy,
          calories: item.calories,
          proteinG: item.proteinG,
          carbsG: item.carbsG,
          fatG: item.fatG,
        })),
      },
    },
    include: { items: true },
  });

  return { ok: true, meal };
}
