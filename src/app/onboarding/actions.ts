"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { calculateDailyTarget } from "@/lib/nutrition/targets";
import { prisma } from "@/lib/db";

const onboardingSchema = z.object({
  sex: z.enum(["MALE", "FEMALE"]),
  age: z.number().int().min(13).max(100),
  heightCm: z.number().min(90).max(240),
  currentWeightKg: z.number().min(25).max(250),
  targetWeightKg: z.number().min(25).max(250).nullable(),
  activityLevel: z.enum([
    "SEDENTARY",
    "LIGHTLY_ACTIVE",
    "ACTIVE",
    "VERY_ACTIVE",
  ]),
  goalType: z.enum(["LOSE_WEIGHT", "MAINTAIN", "GAIN_MUSCLE"]),
  goalRateKgPerWeek: z.number().min(0).max(1),
  dietaryPreference: z.enum([
    "VEGETARIAN",
    "VEGAN",
    "EGGETARIAN",
    "NON_VEGETARIAN",
  ]),
  allergies: z.array(z.string().min(1).max(40)).max(12),
  allergyNotes: z.string().max(240).nullable(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

export async function completeOnboarding(input: OnboardingInput) {
  const parsed = onboardingSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please review your answers and try again.",
    };
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return {
      ok: false,
      message: "Please sign in again before saving your profile.",
    };
  }

  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses.at(0)?.emailAddress ??
    null;
  const target = calculateDailyTarget(parsed.data);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: { clerkId: clerkUser.id },
      create: {
        clerkId: clerkUser.id,
        email,
      },
      update: {
        email,
      },
    });

    await tx.userProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        sex: parsed.data.sex,
        age: parsed.data.age,
        heightCm: parsed.data.heightCm,
        currentWeightKg: parsed.data.currentWeightKg,
        targetWeightKg: parsed.data.targetWeightKg,
        activityLevel: parsed.data.activityLevel,
        goalType: parsed.data.goalType,
        goalRateKgPerWeek: parsed.data.goalRateKgPerWeek,
        dietaryPreference: parsed.data.dietaryPreference,
        allergies: parsed.data.allergies,
        allergyNotes: parsed.data.allergyNotes,
      },
      update: {
        sex: parsed.data.sex,
        age: parsed.data.age,
        heightCm: parsed.data.heightCm,
        currentWeightKg: parsed.data.currentWeightKg,
        targetWeightKg: parsed.data.targetWeightKg,
        activityLevel: parsed.data.activityLevel,
        goalType: parsed.data.goalType,
        goalRateKgPerWeek: parsed.data.goalRateKgPerWeek,
        dietaryPreference: parsed.data.dietaryPreference,
        allergies: parsed.data.allergies,
        allergyNotes: parsed.data.allergyNotes,
      },
    });

    await tx.dailyTarget.create({
      data: {
        userId: user.id,
        calories: target.calories,
        proteinG: target.proteinG,
        carbsG: target.carbsG,
        fatG: target.fatG,
      },
    });
  });

  redirect("/dashboard");
}
