"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Task {
    title: string;
    description: string;
    deadline: Date;
    status?: string;
    assignedTo?: string;
    userId: string;
}

interface TaskResult {
    data?: Task;
    error?: string;
}

async function addTask(formData: FormData): Promise<TaskResult> {
    const session = await auth();

    const title = formData.get('title');
    const description = formData.get('description');
    const deadline = formData.get('deadline');
    const status = formData.get('status');
    const assignedTo = formData.get('assignedTo');
    let userId = "";

    if(!title || title === "" || !description || description === "" || !deadline) {
        return { error: 'Title, Description, and Deadline are required' };
    }

    if(!assignedTo) {
        userId = session?.user?.id ?? "";
    } else {
       const user = await db.user.findUnique({
           where: {
               email: assignedTo.toString(),
           }
       });
       if (!user) {
           return { error: "No user found" };
       }
       userId = user.id;
    }

    const date = new Date(deadline.toString());
    const actualTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const taskStatus = status?.toString();

    try {
        const task = await db.task.create({
            data: {
                title: title.toString(),
                description: description.toString(),
                status: taskStatus,
                userId,
                deadline: actualTime,
            }
        })
        revalidatePath("/create/task")
        return {data: {...task, userId: task.userId ?? ""}};

    } catch (error) {
        return { error: "Task not added" };
    }
}

export default addTask;