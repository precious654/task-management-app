"use client"

import React from 'react'
import {BsThreeDotsVertical} from "react-icons/bs";
import { db } from "@/lib/db"
import Image from "next/image";
import updateTaskStatus from "@/actions/updateTaskStatus";

const Task = ({task}) => {

    // const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     await updateTaskStatus(task);
    // };

    return (
        <>
            <div className="flex justify-between items-center">
                {task.project && <p className="bg-[#55c3c5] rounded-2xl py-1 text-[#FFFFFF] text-xs text-center w-1/4">{task.project.name}</p>}
                <p></p>
                <div>
                    <BsThreeDotsVertical/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image src={task.assignedTo.image} alt={task.assignedTo.name}
                           width={35} height={35} className="rounded-full"/>
                    <div>
                        <p className="font-medium">{task.title}</p>
                    </div>
                </div>
                <input type="checkbox" defaultChecked={task.status === "completed"} name="status" onChange={handleStatusChange} />
            </div>
        </>
    )
}
export default Task
