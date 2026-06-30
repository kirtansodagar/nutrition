import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const mealItemSchema = z.object({
  foodId: z.string().optional(),
  foodName: z.string().min(1),
  portionGrams: z.number().min(1),
  estimatedBy: z.enum(["ai", "user"]).default("ai"),
  calories: z.number().min(0),
  proteinG: z.number().min(0),
  carbsG: z.number().min(0),
  fatG: z.number().min(0),
});

const mealSchema = z.object({
  photoUrl: z.string().url().optional(),
  timeOfDay: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  items: z.array(mealItemSchema).min(1),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = mealSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { photoUrl, timeOfDay, items } = parsed.data;

    const totals = items.reduce(
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
        photoUrl,
        timeOfDay,
        totalCalories: totals.calories,
        totalProteinG: totals.proteinG,
        totalCarbsG: totals.carbsG,
        totalFatG: totals.fatG,
        aiModelUsed: "qwen2.5:7b",
        items: {
          create: items.map((item) => ({
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

    return NextResponse.json({ ok: true, meal });
  } catch (err) {
    console.error("Meal save error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    let dateFilter = {};
    if (dateParam) {
      const date = new Date(dateParam);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      dateFilter = {
        date: { gte: date, lt: nextDay },
      };
    }

    const meals = await prisma.meal.findMany({
      where: {
        userId: user.id,
        ...dateFilter,
      },
      include: { items: true },
      orderBy: { date: "desc" },
      take: 50,
    });

    return NextResponse.json({ meals });
  } catch (err) {
    console.error("Meal fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
