import { auth } from "@clerk/nextjs/server";
import { CalendarDays, Plus, Target } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { prisma } from "@/lib/db";
import { getCurrentUserWithTarget } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const appUser = await getCurrentUserWithTarget(userId);
  const target = appUser?.dailyTargets.at(0);

  if (!appUser?.profile || !target) {
    redirect("/onboarding");
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayMeals = await prisma.meal.findMany({
    where: {
      userId: appUser.id,
      date: { gte: todayStart },
    },
    include: { items: true },
    orderBy: { date: "asc" },
  });

  const consumed = todayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.totalCalories,
      proteinG: acc.proteinG + meal.totalProteinG,
      carbsG: acc.carbsG + meal.totalCarbsG,
      fatG: acc.fatG + meal.totalFatG,
    }),
    { calories: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );

  const remaining = Math.max(target.calories - consumed.calories, 0);
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="mx-auto grid w-full max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[1fr_340px]">
        <section className="grid gap-5">
          <div className="rounded-lg border border-line bg-card p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted">
                  <CalendarDays size={16} aria-hidden />
                  {today}
                </div>
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  Today&apos;s nutrition target
                </h1>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-md bg-[#edf8f2] px-3 py-2 text-sm font-semibold text-primary">
                <Target size={16} aria-hidden />
                {target.calories.toLocaleString("en-IN")} kcal
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Metric label="Consumed" value={consumed.calories} unit="kcal" />
              <Metric label="Remaining" value={remaining} unit="kcal" />
              <Metric label="Target" value={target.calories} unit="kcal" />
            </div>
          </div>

          <div className="rounded-lg border border-line bg-card p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-semibold">Macros</h2>
            <div className="grid gap-4">
              <MacroBar
                label="Protein"
                consumed={consumed.proteinG}
                target={target.proteinG}
                color="bg-primary"
              />
              <MacroBar
                label="Carbs"
                consumed={consumed.carbsG}
                target={target.carbsG}
                color="bg-accent"
              />
              <MacroBar
                label="Fat"
                consumed={consumed.fatG}
                target={target.fatG}
                color="bg-[#5946b2]"
              />
            </div>
          </div>

          {/* Meal History */}
          {todayMeals.length > 0 && (
            <div className="rounded-lg border border-line bg-card p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Today&apos;s Meals</h2>
                <Link
                  href="/log"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-primary-strong"
                >
                  <Plus size={14} aria-hidden />
                  Log food
                </Link>
              </div>
              <div className="space-y-3">
                {todayMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between rounded-md border border-line p-3">
                    <div>
                      <p className="font-semibold capitalize">{meal.timeOfDay}</p>
                      <p className="text-sm text-muted">
                        {meal.items.map((item) => item.foodName).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{meal.totalCalories} kcal</p>
                      <p className="text-xs text-muted">
                        P: {meal.totalProteinG}g | C: {meal.totalCarbsG}g | F: {meal.totalFatG}g
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {todayMeals.length === 0 && (
            <div className="rounded-lg border border-dashed border-line bg-card p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-md bg-[#f4efe6] text-primary">
                <Plus size={22} aria-hidden />
              </div>
              <h2 className="text-lg font-semibold">No meals logged yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
                Your target is ready. Food logging is the next daily action for
                this dashboard.
              </p>
              <Link
                href="/log"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 font-semibold text-white transition hover:bg-primary-strong"
              >
                <Plus size={18} aria-hidden />
                Log food
              </Link>
            </div>
          )}
        </section>

        <aside className="rounded-lg border border-line bg-card p-5 shadow-sm lg:sticky lg:top-5 lg:h-fit">
          <h2 className="text-lg font-semibold">Profile basis</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <ProfileRow label="Age" value={`${appUser.profile.age} years`} />
            <ProfileRow
              label="Height"
              value={`${Number(appUser.profile.heightCm).toFixed(0)} cm`}
            />
            <ProfileRow
              label="Weight"
              value={`${Number(appUser.profile.currentWeightKg).toFixed(1)} kg`}
            />
            <ProfileRow
              label="Activity"
              value={formatEnum(appUser.profile.activityLevel)}
            />
            <ProfileRow label="Goal" value={formatEnum(appUser.profile.goalType)} />
            <ProfileRow
              label="Diet"
              value={formatEnum(appUser.profile.dietaryPreference)}
            />
          </dl>
        </aside>
      </main>
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="rounded-md border border-line bg-[#fbfaf7] p-4">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold">
        {value.toLocaleString("en-IN")}
      </p>
      <p className="text-sm text-muted">{unit}</p>
    </div>
  );
}

function MacroBar({
  label,
  consumed: consumedGrams,
  target,
  color,
}: {
  label: string;
  consumed: number;
  target: number;
  color: string;
}) {
  const percentage = target > 0 ? Math.min((consumedGrams / target) * 100, 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{label}</span>
        <span className="text-muted">
          {consumedGrams}g / {target}g
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#ece4d8]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

function formatEnum(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
