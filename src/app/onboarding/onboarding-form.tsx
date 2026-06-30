"use client";

import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import {
  completeOnboarding,
  type OnboardingInput,
} from "@/app/onboarding/actions";

type StepId =
  | "sex"
  | "age"
  | "height"
  | "weight"
  | "activity"
  | "goal"
  | "diet"
  | "allergies";

const steps: { id: StepId; title: string }[] = [
  { id: "sex", title: "Sex" },
  { id: "age", title: "Age" },
  { id: "height", title: "Height" },
  { id: "weight", title: "Weight" },
  { id: "activity", title: "Activity" },
  { id: "goal", title: "Goal" },
  { id: "diet", title: "Diet" },
  { id: "allergies", title: "Allergies" },
];

const allergyOptions = [
  "Peanuts",
  "Tree nuts",
  "Milk",
  "Egg",
  "Soy",
  "Wheat",
  "Fish",
  "Shellfish",
  "Sesame",
];

const initialData: OnboardingInput = {
  sex: "MALE",
  age: 28,
  heightCm: 170,
  currentWeightKg: 70,
  targetWeightKg: null,
  activityLevel: "LIGHTLY_ACTIVE",
  goalType: "MAINTAIN",
  goalRateKgPerWeek: 0,
  dietaryPreference: "VEGETARIAN",
  allergies: [],
  allergyNotes: null,
};

export function OnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<OnboardingInput>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentStep = steps[stepIndex];
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / steps.length) * 100),
    [stepIndex],
  );

  function updateData(next: Partial<OnboardingInput>) {
    setData((previous) => ({ ...previous, ...next }));
    setError(null);
  }

  function validateCurrentStep() {
    const checks: Record<StepId, boolean> = {
      sex: Boolean(data.sex),
      age: data.age >= 13 && data.age <= 100,
      height: data.heightCm >= 90 && data.heightCm <= 240,
      weight:
        data.currentWeightKg >= 25 &&
        data.currentWeightKg <= 250 &&
        (data.targetWeightKg === null ||
          (data.targetWeightKg >= 25 && data.targetWeightKg <= 250)),
      activity: Boolean(data.activityLevel),
      goal:
        data.goalType === "MAINTAIN"
          ? data.goalRateKgPerWeek === 0
          : data.goalRateKgPerWeek > 0 && data.goalRateKgPerWeek <= 1,
      diet: Boolean(data.dietaryPreference),
      allergies: data.allergies.length <= 12,
    };

    if (!checks[currentStep.id]) {
      setError("Please enter a valid answer before continuing.");
      return false;
    }

    return true;
  }

  function goNext() {
    if (!validateCurrentStep()) {
      return;
    }

    setStepIndex((value) => Math.min(value + 1, steps.length - 1));
  }

  function submit() {
    if (!validateCurrentStep()) {
      return;
    }

    startTransition(async () => {
      const result = await completeOnboarding(data);

      if (result && !result.ok) {
        setError(result.message);
      }
    });
  }

  return (
    <div className="w-full rounded-lg border border-line bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted">
            Step {stepIndex + 1} of {steps.length}
          </p>
          <p className="text-sm font-semibold text-primary">{progress}%</p>
        </div>
        <div className="h-2 rounded-full bg-[#ece4d8]">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="min-h-[340px]">
        {currentStep.id === "sex" && (
          <Question title="Which sex should we use for BMR calculation?">
            <Segmented
              value={data.sex}
              options={[
                ["MALE", "Male"],
                ["FEMALE", "Female"],
              ]}
              onChange={(sex) => updateData({ sex })}
            />
          </Question>
        )}

        {currentStep.id === "age" && (
          <Question title="How old are you?">
            <NumberField
              label="Age"
              suffix="years"
              min={13}
              max={100}
              value={data.age}
              onChange={(age) => updateData({ age })}
            />
          </Question>
        )}

        {currentStep.id === "height" && (
          <Question title="What is your height?">
            <NumberField
              label="Height"
              suffix="cm"
              min={90}
              max={240}
              value={data.heightCm}
              onChange={(heightCm) => updateData({ heightCm })}
            />
          </Question>
        )}

        {currentStep.id === "weight" && (
          <Question title="What is your current weight and target?">
            <div className="grid gap-4">
              <NumberField
                label="Current weight"
                suffix="kg"
                min={25}
                max={250}
                step={0.1}
                value={data.currentWeightKg}
                onChange={(currentWeightKg) => updateData({ currentWeightKg })}
              />
              <label className="flex items-center gap-3 rounded-md border border-line p-3 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={data.targetWeightKg === null}
                  onChange={(event) =>
                    updateData({
                      targetWeightKg: event.target.checked
                        ? null
                        : data.currentWeightKg,
                    })
                  }
                />
                Maintain current weight
              </label>
              {data.targetWeightKg !== null && (
                <NumberField
                  label="Target weight"
                  suffix="kg"
                  min={25}
                  max={250}
                  step={0.1}
                  value={data.targetWeightKg}
                  onChange={(targetWeightKg) => updateData({ targetWeightKg })}
                />
              )}
            </div>
          </Question>
        )}

        {currentStep.id === "activity" && (
          <Question title="How active are you most weeks?">
            <RadioList
              value={data.activityLevel}
              options={[
                ["SEDENTARY", "Sedentary", "Desk routine, little exercise"],
                [
                  "LIGHTLY_ACTIVE",
                  "Lightly active",
                  "Walks or light workouts 1-3 days weekly",
                ],
                ["ACTIVE", "Active", "Training or sports 3-5 days weekly"],
                [
                  "VERY_ACTIVE",
                  "Very active",
                  "Hard training or physical work most days",
                ],
              ]}
              onChange={(activityLevel) => updateData({ activityLevel })}
            />
          </Question>
        )}

        {currentStep.id === "goal" && (
          <Question title="What is your goal and weekly rate?">
            <div className="grid gap-5">
              <RadioList
                value={data.goalType}
                options={[
                  ["LOSE_WEIGHT", "Lose weight", "Creates a calorie deficit"],
                  ["MAINTAIN", "Maintain", "Keeps target near TDEE"],
                  ["GAIN_MUSCLE", "Gain muscle", "Adds calories and protein"],
                ]}
                onChange={(goalType) =>
                  updateData({
                    goalType,
                    goalRateKgPerWeek:
                      goalType === "MAINTAIN" ? 0 : data.goalRateKgPerWeek || 0.25,
                  })
                }
              />
              {data.goalType !== "MAINTAIN" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    Weekly rate
                  </label>
                  <select
                    value={data.goalRateKgPerWeek}
                    onChange={(event) =>
                      updateData({
                        goalRateKgPerWeek: Number(event.target.value),
                      })
                    }
                    className="min-h-12 w-full rounded-md border border-line bg-white px-3"
                  >
                    <option value={0.25}>0.25 kg per week</option>
                    <option value={0.5}>0.5 kg per week</option>
                    <option value={0.75}>0.75 kg per week</option>
                    <option value={1}>1 kg per week</option>
                  </select>
                </div>
              )}
            </div>
          </Question>
        )}

        {currentStep.id === "diet" && (
          <Question title="What is your dietary preference?">
            <RadioList
              value={data.dietaryPreference}
              options={[
                ["VEGETARIAN", "Vegetarian", "No meat, fish, or eggs"],
                ["VEGAN", "Vegan", "No animal products"],
                ["EGGETARIAN", "Eggetarian", "Vegetarian meals with eggs"],
                [
                  "NON_VEGETARIAN",
                  "Non-vegetarian",
                  "Includes meat, fish, or poultry",
                ],
              ]}
              onChange={(dietaryPreference) => updateData({ dietaryPreference })}
            />
          </Question>
        )}

        {currentStep.id === "allergies" && (
          <Question title="Any allergies we should remember?">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {allergyOptions.map((allergy) => {
                  const checked = data.allergies.includes(allergy);

                  return (
                    <label
                      key={allergy}
                      className="flex min-h-12 items-center gap-3 rounded-md border border-line px-3 text-sm font-medium"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          updateData({
                            allergies: checked
                              ? data.allergies.filter((item) => item !== allergy)
                              : [...data.allergies, allergy],
                          })
                        }
                      />
                      {allergy}
                    </label>
                  );
                })}
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-foreground">
                  Other allergies or notes
                </span>
                <textarea
                  value={data.allergyNotes ?? ""}
                  onChange={(event) =>
                    updateData({
                      allergyNotes: event.target.value.trim()
                        ? event.target.value
                        : null,
                    })
                  }
                  rows={4}
                  className="w-full resize-none rounded-md border border-line bg-white p-3"
                />
              </label>
            </div>
          </Question>
        )}
      </div>

      {error && (
        <p className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStepIndex((value) => Math.max(value - 1, 0))}
          disabled={stepIndex === 0 || isPending}
          className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line bg-white px-4 font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft size={18} aria-hidden />
          Back
        </button>

        {stepIndex === steps.length - 1 ? (
          <button
            type="button"
            onClick={submit}
            disabled={isPending}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 font-semibold text-white transition hover:bg-primary-strong disabled:cursor-wait disabled:opacity-70"
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} aria-hidden />
            ) : (
              <Check size={18} aria-hidden />
            )}
            Save target
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={isPending}
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 font-semibold text-white transition hover:bg-primary-strong"
          >
            Next
            <ArrowRight size={18} aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

function Question({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold leading-tight sm:text-3xl">
        {title}
      </h1>
      {children}
    </div>
  );
}

function NumberField({
  label,
  suffix,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <span className="flex min-h-12 overflow-hidden rounded-md border border-line bg-white">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="min-w-0 flex-1 px-3 outline-none"
        />
        <span className="flex min-w-16 items-center justify-center border-l border-line bg-[#f4efe6] px-3 text-sm font-semibold text-muted">
          {suffix}
        </span>
      </span>
    </label>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: [T, string][];
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map(([optionValue, label]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onChange(optionValue)}
          className={`min-h-14 rounded-md border px-3 font-semibold transition ${
            value === optionValue
              ? "border-primary bg-primary text-white"
              : "border-line bg-white text-foreground hover:border-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function RadioList<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: [T, string, string][];
  onChange: (value: T) => void;
}) {
  return (
    <div className="grid gap-2">
      {options.map(([optionValue, label, description]) => (
        <button
          key={optionValue}
          type="button"
          onClick={() => onChange(optionValue)}
          className={`grid min-h-16 gap-1 rounded-md border p-3 text-left transition ${
            value === optionValue
              ? "border-primary bg-[#edf8f2]"
              : "border-line bg-white hover:border-primary"
          }`}
        >
          <span className="font-semibold text-foreground">{label}</span>
          <span className="text-sm leading-5 text-muted">{description}</span>
        </button>
      ))}
    </div>
  );
}
