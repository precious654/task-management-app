import React from 'react'
import { auth } from "@/auth"
import projects from "@/data/projects.json"
import { VscTarget } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa6";
import { IoPeopleOutline} from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import Image from "next/image";
import {IoMdAdd} from "react-icons/io";
import image from "@/public/assets/54b19ada-d53e-4ee9-8882-9dfed1bf1396.jpg";
import image2 from "@/public/assets/portrait-man-cartoon-style1.jpg";
import image3 from "@/public/assets/portrait-man-cartoon-style.jpg";
import ProgressCircle from "@/components/ProgressCircle";
import ProgressBar from "@/components/ProgressBar";
import {redirect} from "next/navigation";

const Page = async ({params}: { params: Promise<{ projectId: string }> }) => {
    const id = (await params).projectId;
    const images = [image, image2, image3];
    const project = projects.filter((item) => item.id === id);
    const session = await auth();

    if (!session) {
        redirect("/auth/signIn");
    }

    return (
        <main className="w-full md:h-full md:overflow-y-clip no-scrollbar pb-5 md:pb-0">
            {
                project.map( item => {
                    return (
                        <div key={item.id} className="md:h-full">
                            <p className="md:text-3xl text-2xl font-medium">{item.name}</p>
                            <div className="mt-10 hidden md:grid grid-cols-2 gap-28 gap-y-7 w-10/12">
                                <div className="flex items-center gap-28">
                                    <div className="flex items-center gap-1">
                                        <VscTarget size={25}/>
                                        <p>Status</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <p className={`${item.status === "ongoing" ? "bg-[#5694f2]" : item.status === "pending" ? "bg-[#ffc247]" : item.status === "completed" ? "bg-[#53c2c5]" : "bg-[#53c2c5]"} p-1 text-sm rounded-md text-[#FFFFFF]`}>{item.status}</p>
                                        <div
                                            className={`${item.status === "ongoing" ? "bg-[#5694f2]" : item.status === "pending" ? "bg-[#ffc247]" : item.status === "completed" ? "bg-[#53c2c5]" : "bg-[#53c2c5]"} p-1 rounded-md text-[#FFFFFF]`}>
                                            <FaPlay size={18}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-28">
                                    <div className="flex items-center gap-1">
                                        <IoPeopleOutline size={25}/>
                                        <p>Team</p>
                                    </div>
                                    <div className="flex items-center">
                                        {images.map((image, index) => {
                                            return (
                                                <div key={index} className="ml-[-0.3rem]">
                                                    <Image
                                                        src={image}
                                                        alt="profile"
                                                        className="w-6 h-6 rounded-full"
                                                        style={{zIndex: images.length - index}}
                                                    ></Image>
                                                </div>
                                            );
                                        })}
                                        <div
                                            className="p-1 rounded-full bg-orange-300 relative ml-[-0.3rem] cursor-pointer">
                                            <IoMdAdd size={17} className="text-[#FFFFFF]"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-24">
                                    <div className="flex items-center gap-1">
                                        <LuAlarmClock size={20} />
                                        <p>Deadline</p>
                                    </div>
                                    <p>February 20, 2025</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <p>Progress</p>
                                        <p>{item.progress}%</p>
                                    </div>
                                    <ProgressBar progress={item.progress} />
                                </div>
                            </div>
                            <div className="md:mt-10 mt-5 md:w-10/12 md:rounded-lg md:p-4 md:bg-gray-200 flex flex-col md:gap-6 gap-3">
                                <p className="font-medium text-xl">Objective</p>
                                <p className="text-sm text-gray-500 font-medium leading-7">{item.description}</p>
                            </div>
                            <div  className="md:hidden flex items-center justify-between mt-5">
                                <div className="flex flex-col gap-2.5">
                                    <div
                                        className="flex items-center gap-2 text-sm font-medium bg-[#edeced] p-2 rounded-lg">
                                        <LuAlarmClock size={18}/>
                                        <div className="flex">
                                            <p>Deadline:</p>
                                            <p>February 20, 2025</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium">Team</p>
                                        <div className="flex items-center">
                                            {images.map((image, index) => {
                                                return (
                                                    <div key={index} className="ml-[-0.3rem]">
                                                        <Image
                                                            src={image}
                                                            alt="profile"
                                                            className="w-6 h-6 rounded-full"
                                                            style={{zIndex: images.length - index}}
                                                        ></Image>
                                                    </div>
                                                );
                                            })}
                                            <div
                                                className="p-1 rounded-full bg-orange-300 relative ml-[-0.3rem] cursor-pointer">
                                                <IoMdAdd size={17} className="text-[#FFFFFF]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ProgressCircle progress={item.progress}/>
                            </div>
                            <p className="mt-8 text-2xl font-medium">Tasks</p>
                            <div className="h-[26%] overflow-y-auto no-scrollbar sm:mt-5 md:mt-1 rounded-md">
                                <div className="md:grid grid-cols-3 gap-5 flex flex-col">
                                    {item.tasks.map((task, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center p-2 bg-[#FFFFFF] rounded-lg border-[#626363] border-2 shadow-md">
                                                <div className="flex items-center gap-2">
                                                    <Image src={image} alt="profile" width={35} height={35}
                                                           className="rounded-full"/>
                                                    <p className="font-medium">{task.title}</p>
                                                </div>
                                                <form action="">
                                                    <input type="checkbox" defaultChecked={task.status === "completed"}/>
                                                </form>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}
export default Page
