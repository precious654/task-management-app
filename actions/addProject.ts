"use server"

import { db } from "@/lib/db";
import {revalidatePath} from "next/cache";

interface Project {
    name: string;
    description?: string;
    status?: string;
    deadline: Date;
    progress?: number;
    teamId?: string;
}

interface ProjectResult{
    data?: Project;
    error?: string;
}

async function addProject(formData: FormData): Promise<ProjectResult> {
    const name = formData.get("name");
    const description = formData.get("description");
    const deadline = formData.get("deadline");
    const status = formData.get("status");

    if(!name || name === "" || !description || description === "" || !deadline) {
        return { error: "All fields are required" };
    }

    const date = new Date(deadline.toString());
    const projectStatus = status?.toString();

    try {
        const project = await db.project.create({
            data: {
                name: name.toString(),
                description: description.toString(),
                status: projectStatus,
                deadline: date,
            }
        });
        revalidatePath("/create/project");
        return {data: {...project, teamId: project.teamId ?? "", description: project.description ?? ""}}
    } catch (error) {
        return {error: "Project did not add successfully"};
    }

}

export default addProject;