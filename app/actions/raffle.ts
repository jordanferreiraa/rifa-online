"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getPurchasedPoints() {
  try {
    const points = await prisma.point.findMany({
      select: { number: true },
    });
    // return points.map((p) => p.number);
    return points.map((p: { number: number }) => p.number);
  } catch (error) {
    console.error("Error fetching purchased points:", error);
    return [];
  }
}

export async function getPurchasedPointsWithUsers() {
  try {
    const points = await prisma.point.findMany({
      include: {
        user: true,
      },
      orderBy: {
        number: "asc",
      },
    });
    return points;
  } catch (error) {
    console.error("Error fetching purchased points with users:", error);
    return [];
  }
}

export async function purchasePoints(userData: { name: string; whatsapp: string }, points: number[]) {
  try {
    // 1. Create or update user
    const user = await prisma.user.upsert({
      where: { whatsapp: userData.whatsapp },
      update: { name: userData.name },
      create: {
        name: userData.name,
        whatsapp: userData.whatsapp,
      },
    });

    // 2. Create points
    // Note: We use createMany for efficiency, but we should handle potential conflicts
    // Since we added @unique to number, it will fail if any point is already bought
    await prisma.point.createMany({
      data: points.map((n) => ({
        number: n,
        userId: user.id,
      })),
      skipDuplicates: false, // We want it to fail if someone tries to buy a bought point
    });

    revalidatePath("/");
    revalidatePath("/pontos");
    return { success: true };
  } catch (error: any) {
    console.error("Error purchasing points:", error);
    return { success: false, error: error.message };
  }
}
