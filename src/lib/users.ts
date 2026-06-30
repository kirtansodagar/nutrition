import { prisma } from "@/lib/db";

export async function getCurrentUserWithTarget(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: {
      profile: true,
      dailyTargets: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });
}
