"use server"

import { db } from "@/lib/db";

async function updateTaskProject(taskId: string, projectId: string) {
    try {
        const task = await db.task.update({
            where: {
                id: taskId,
            },
            data: {
                projectId: projectId,
            }
        });
        if (!task) {
            return {error: "Task not found"};
        } else {
            console.log(task);
            return {data: task};
        }

    } catch (error) {
        return {error: "Did not update the task project"};
    }
}

export default updateTaskProject;