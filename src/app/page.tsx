import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, CheckCircle2, Utensils } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentUserWithTarget } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
  const { userId } = await auth();

  if (userId) {
    const appUser = await getCurrentUserWithTarget(userId);
    redirect(appUser?.profile ? "/dashboard" : "/onboarding");
  }

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
            <Utensils size={18} aria-hidden />
          </span>
          Ruflo Nutrition
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted transition hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-strong"
          >
            Sign up
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Built for Indian plates
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Daily nutrition targets that understand your real routine.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Start with a practical calorie and macro target based on your body,
            goal, activity level, diet preference, and allergy profile.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/sign-up"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 font-semibold text-white transition hover:bg-primary-strong"
            >
              Create your target
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-card px-5 font-semibold text-foreground transition hover:border-primary"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-card p-5 shadow-sm">
          <div className="grid gap-3">
            {[
              "Onboarding collects height, weight, activity, goal, diet, and allergies.",
              "Targets use Mifflin-St Jeor BMR, activity multiplier, and goal adjustment.",
              "Dashboard starts clean with zero meals logged and your target ready.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-md bg-[#f4efe6] p-4">
                <CheckCircle2 className="mt-0.5 text-primary" size={20} />
                <p className="text-sm leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
