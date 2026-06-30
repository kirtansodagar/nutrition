export const activityMultipliers = {
  SEDENTARY: 1.2,
  LIGHTLY_ACTIVE: 1.375,
  ACTIVE: 1.55,
  VERY_ACTIVE: 1.725,
} as const;

export const macroSplits = {
  LOSE_WEIGHT: { protein: 0.3, carbs: 0.45, fat: 0.25 },
  MAINTAIN: { protein: 0.25, carbs: 0.5, fat: 0.25 },
  GAIN_MUSCLE: { protein: 0.3, carbs: 0.45, fat: 0.25 },
} as const;

export type TargetInput = {
  sex: "MALE" | "FEMALE";
  age: number;
  heightCm: number;
  currentWeightKg: number;
  activityLevel: keyof typeof activityMultipliers;
  goalType: keyof typeof macroSplits;
  goalRateKgPerWeek: number;
};

export function calculateDailyTarget(input: TargetInput) {
  const sexOffset = input.sex === "MALE" ? 5 : -161;
  const bmr =
    10 * input.currentWeightKg + 6.25 * input.heightCm - 5 * input.age + sexOffset;
  const tdee = bmr * activityMultipliers[input.activityLevel];
  const weeklyCalorieDelta =
    input.goalType === "MAINTAIN" ? 0 : (input.goalRateKgPerWeek * 7700) / 7;
  const targetCalories =
    input.goalType === "LOSE_WEIGHT"
      ? tdee - weeklyCalorieDelta
      : tdee + weeklyCalorieDelta;
  const calories = Math.max(1000, Math.round(targetCalories));
  const split = macroSplits[input.goalType];

  return {
    calories,
    proteinG: Math.round((calories * split.protein) / 4),
    carbsG: Math.round((calories * split.carbs) / 4),
    fatG: Math.round((calories * split.fat) / 9),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}
