"use client"

import React from 'react'
import {BsThreeDotsVertical} from "react-icons/bs";
import Image from "next/image";
import getProjects from "@/actions/getProjects";
import updateTaskProject from "@/actions/updateTaskProject";

const Task = ({task}) => {
    const [toggle, setToggle] = React.useState(false);
    const [dataProjects, setDataProjects] = React.useState<any>([]);

    const handleClick =  () => {
        setToggle(!toggle);
    }

    const handleUpdate = async (projectId: string) => {
        await updateTaskProject(task.id, projectId);
    }

    React.useEffect( () => {
            async function projects () {
                const {data} = await getProjects();
                setDataProjects(data);
            }
            projects();
        }
    ,[])

    // const handleStatusChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault();
    //     await updateTaskStatus(task);
    // };

    return (
        <main className="relative">
            <div className="flex justify-between items-center">
                {task.project && <p className="bg-[#55c3c5] rounded-2xl py-1 text-[#FFFFFF] text-xs text-center w-1/4">{task.project.name}</p>}
                <p></p>
                <button onClick={handleClick} className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                    <BsThreeDotsVertical/>
                </button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Image src={task.assignedTo.image} alt={task.assignedTo.name}
                           width={35} height={35} className="rounded-full"/>
                    <div>
                        <p className="font-medium">{task.title}</p>
                    </div>
                </div>
                <input type="checkbox" defaultChecked={task.status === "completed"} name="status" />
            </div>
            {toggle && <div className="flex flex-col absolute right-2 top-2 z-10 gap-2">
                {dataProjects.map((item) => (<button className="border-2 border-gray-500" key={item.id} onClick={() => handleUpdate(item.id)}>{item.name}</button>))}
            </div>
            }
        </main>
    )
}
export default Task
