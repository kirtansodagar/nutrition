import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/app/onboarding/onboarding-form";
import { getCurrentUserWithTarget } from "@/lib/users";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const appUser = await getCurrentUserWithTarget(userId);

  if (appUser?.profile) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-48px)] w-full max-w-2xl items-center">
        <OnboardingForm />
      </section>
    </main>
  );
}
