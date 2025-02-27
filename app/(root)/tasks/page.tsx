import React from 'react'
import { auth } from "@/auth"
import Image from "next/image";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import Form from "next/form";
import {IoSearchOutline} from "react-icons/io5";
import {redirect} from "next/navigation";
import getTasks from "@/actions/getTasks";
import Task from "@/components/Task"

const Page = async () => {
    const session = await auth();
    const {data, error} = await getTasks();
    if(data) {
        console.log(data);
    } else {
        console.log(error)
    }

    if (!session) {
        redirect("/auth/signIn");
    }

    const ongoingTasks = data?.filter((task) => task.status === "ongoing");
    const pendingTasks = data?.filter((task) => task.status === "pending");
    const completedTasks = data?.filter((task) => task.status === "completed");

    return (
        <main className="w-full lg:h-full lg:overflow-y-clip no-scrollbar pb-5 lg:pb-0">
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
                            <p className="lg:text-2xl text-xl font-medium">
                                Hi, {session.user?.name} &#128075;
                            </p>
                        )}
                        <p className="text-gray-500">Your daily adventure starts now</p>
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-3">
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
            <div className="lg:flex lg:items-center lg:justify-between grid grid-cols-2 gap-4 mt-10">
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg lg:text-lg text-sm">
                    <p className="text-3xl font-medium">{data?.length}</p>
                    <p>Total tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg lg:text-lg text-sm">
                    <p className="text-3xl font-medium">{ongoingTasks?.length}</p>
                    <p>Ongoing tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg lg:text-lg text-sm">
                    <p className="text-3xl font-medium">{pendingTasks?.length}</p>
                    <p>Pending tasks</p>
                </div>
                <div className="flex flex-col gap-1 py-3 px-6 bg-[#f6c69c] rounded-lg lg:text-lg text-sm">
                    <p className="text-3xl font-medium">{completedTasks?.length}</p>
                    <p>Completed tasks</p>
                </div>
            </div>
            <p className="mt-10 text-2xl font-medium">All Tasks</p>
            <div className="mt-5 no-scrollbar lg:h-[55%] overflow-y-auto">
                <div className="lg:grid grid-cols-3 gap-5 flex flex-col">
                    {
                        data?.map((task) => {
                            return (
                                <div key={task.id}
                                     className="flex flex-col gap-2 bg-[#FFFFFF] p-2 rounded-lg border-[#626363] border-2 shadow-lg">
                                    <Task task={task} />
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
