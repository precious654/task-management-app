"use server"

import { db } from "@/lib/db";

async function getProjects() {
    try {
        const projects = await db.project.findMany();
        if(!projects || projects.length === 0) {
            return {error: "No project found"};
        } else {
            return {data: projects};
        }

    } catch (error) {
        return { error: "Could not get projects" };
    }
}

export default getProjects;