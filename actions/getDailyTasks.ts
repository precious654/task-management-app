"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

async function getDailyTasks() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: "User not authenticated" };
  }

  const today = new Date();

  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    0,
    0,
    0
  );

  try {
    const dailyTasks = await db.task.findMany({
      where: {
        userId,
        deadline: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        project: true,
        assignedTo: true,
      },
      orderBy: {
        deadline: "asc",
      },
    });
    if (!dailyTasks || dailyTasks.length === 0) {
      return { error: "No tasks today." };
    }
    return { data: dailyTasks };
  } catch (error) {
    return { error: "Failed to get daily tasks." };
  }
}

export default getDailyTasks;
