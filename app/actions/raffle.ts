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

export async function getPointsByWhatsapp(whatsapp: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { whatsapp },
      include: {
        points: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });

    if (!user) {
      return { success: false, error: "Usuário não encontrado." };
    }

    return { 
      success: true, 
      points: user.points.map(p => p.number),
      userName: user.name 
    };
  } catch (error) {
    console.error("Error fetching points by whatsapp:", error);
    return { success: false, error: "Erro ao buscar pontos." };
  }
}

export async function purchasePoints(
  userData: { name: string; whatsapp: string }, 
  points: number[],
  paymentMethod: string = "PIX",
  status: string = "PAID"
) {
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
    await prisma.point.createMany({
      data: points.map((n) => ({
        number: n,
        userId: user.id,
        paymentMethod,
        status,
      })),
      skipDuplicates: false,
    });

    revalidatePath("/");
    revalidatePath("/pontos");
    return { success: true };
  } catch (error) {
    console.error("Error purchasing points:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
