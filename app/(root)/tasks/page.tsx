import React from 'react'
import { auth } from "@/auth"
import Image from "next/image";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import Form from "next/form";
import {IoSearchOutline} from "react-icons/io5";
import tasks from "@/data/tasks.json";

const Page = async () => {
    const session = await auth();

    return (
        <main className="w-full md:h-full md:overflow-y-clip no-scrollbar pb-5 md:pb-0">
            <header className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Image
                        src={session?.user?.image ?? ""}
                        alt="profile"
                        width={50}
                        height={20}
                        className="rounded-full "
                    />
                    <div className="flex flex-col gap-1">
                        {session && (
                            <p className="md:text-2xl text-xl font-medium">
                                Hi, {session.user?.name} &#128075;
                            </p>
                        )}
                        <p className="text-gray-500">Your daily adventure starts now</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className="flex items-center gap-1 bg-[#f26e56] p-4 rounded-[2rem]">
                        <Link
                            href="/create/project"
                            className="p-1 bg-[#FFFFFF] rounded-full"
                        >
                            <IoMdAdd size={20} className="text-[#f26e56]"/>
                        </Link>
                        <Link href="/create/task" className="text-[#FFFFFF]">
                            create tasks
                        </Link>
                    </button>

                    <Form action="/" className="relative">
                        <input
                            type="text"
                            defaultValue=""
                            name="query"
                            placeholder="Search tasks..."
                            className="p-4 w-full rounded-xl outline-none bg-[#e1e9ef]"
                        />
                        <button className="p-2 bg-[#ecf0f7] rounded-full absolute right-2 top-2">
                            <IoSearchOutline size={20}/>
                        </button>
                    </Form>
                </div>
            </header>
            <div className="md:flex md:items-center md:justify-between grid grid-cols-2 gap-4 mt-10">
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg md:text-lg text-sm">
                    <p className="text-3xl font-medium">64</p>
                    <p>Total tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg md:text-lg text-sm">
                    <p className="text-3xl font-medium">14</p>
                    <p>Ongoing tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg md:text-lg text-sm">
                    <p className="text-3xl font-medium">30</p>
                    <p>Pending tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg md:text-lg text-sm">
                    <p className="text-3xl font-medium">20</p>
                    <p>Completed tasks</p>
                </div>
            </div>
            <p className="mt-10 text-2xl font-medium">All Tasks</p>
            <div className="mt-5 no-scrollbar md:h-[55%] overflow-y-auto">
                <div className="md:grid grid-cols-3 gap-5 flex flex-col">
                    {
                        tasks.map((task) => {
                            return (
                                <div key={task.id}
                                     className="flex flex-col gap-2 bg-[#FFFFFF] p-2 rounded-lg border-[#626363] border-2 shadow-md">
                                    <p className="bg-[#55c3c5] rounded-2xl py-1 text-[#FFFFFF] text-xs text-center w-2/4">{task.project.name}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Image src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""}
                                                   width={35} height={35} className="rounded-full"/>
                                            <div>
                                                <p className="font-medium">{task.title}</p>
                                            </div>
                                        </div>
                                        <form action="">
                                            <input type="checkbox" name="status"/>
                                        </form>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}
export default Page
