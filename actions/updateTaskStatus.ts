"use server"

import {db} from "@/lib/db";

const updateTaskStatus = async (task) => {
    try {
        const newStatus = task.status === "completed" ? "pending" : "completed";

        const updatedTask = await db.task.update({
            where: {
                id: task.id,
            },
            data: {
                status: newStatus
            },
            include: {
                project: true,
                assignedTo: true
            }
        });
        console.log("Task updated:", updatedTask);
        
    } catch (error) {
        console.log("Error updating task status:", error);
    }
};

export default updateTaskStatus;