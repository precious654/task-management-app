"use server"
import { db } from "@/lib/db";
import { auth } from "@/auth";

interface Task {
    id: string;
    title: string;
    description: string;
    deadline: Date;
    status: string;
    userId?: string;
    projectId?: string;
}

interface TaskData {
    data?: Task[];
    error?: string;
}

async function getTasks() {
    const session = await auth();
    const userId = session?.user?.id ?? "";

    try {
        const tasks = await db.task.findMany({
            where: {
                userId,
            },
            include: {
                project: true,
                assignedTo: true,
            }
        })
        if(!tasks) {
            return { error: "You have no tasks" };
        } else {
            return {data: tasks}
        }
    } catch (error) {
        return { error: "There are no tasks" };
    }
}

export default getTasks;