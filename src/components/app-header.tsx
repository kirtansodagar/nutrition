import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Utensils } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b border-line bg-card">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-white">
            <Utensils size={18} aria-hidden />
          </span>
          Ruflo Nutrition
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
