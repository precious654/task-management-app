import React from 'react'
import {auth} from "@/auth";
import Image from "next/image";
import Link from "next/link";
import {IoMdAdd} from "react-icons/io";
import Form from "next/form";
import {IoNotificationsOutline, IoSearchOutline} from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { GoClock } from "react-icons/go";
import { MdTaskAlt } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

const Page = async () => {
    const session = await auth();

    return (
        <main className="w-full md:h-full md:overflow-y-auto no-scrollbar">
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
                        <Link href="/create/project" className="p-1 bg-[#FFFFFF] rounded-full">
                            <IoMdAdd size={20} className="text-[#f26e56]"/>
                        </Link>
                        <Link href="/create/project" className="text-[#FFFFFF]">
                            create project
                        </Link>
                    </button>

                    <Form action="/" className="relative">
                        <input
                            type="text"
                            defaultValue=""
                            name="query"
                            placeholder="Search projects..."
                            className="p-4 w-full rounded-xl outline-none bg-[#e1e9ef]"
                        />
                        <button className="p-2 bg-[#ecf0f7] rounded-full absolute right-2 top-2">
                            <IoSearchOutline size={20}/>
                        </button>
                    </Form>

                    <div className="p-4 bg-[#e1e9ef] rounded-xl">
                        <IoNotificationsOutline size={20}/>
                    </div>
                </div>
            </header>

            <div className="md:flex items-center md:justify-between grid grid-cols-2 gap-4 mt-10">
                <div className="bg-[#ffc247] p-5 rounded-lg flex items-center gap-3">
                    <GoClock size={30} className="text-[#FFFFFF]" />
                    <div>
                        <p className="md:text-3xl text-lg font-medium">10</p>
                        <p className="text-sm">pending projects</p>
                    </div>
                </div>
                <div className="bg-[#5694f2] p-5 rounded-lg flex items-center gap-3">
                    <TfiReload size={30} className="text-[#FFFFFF]"/>
                    <div>
                        <p className="text-3xl font-medium">12</p>
                        <p>ongoing projects</p>
                    </div>
                </div>
                <div className="bg-[#53c2c5] p-5 rounded-lg flex items-center gap-3">
                    <MdTaskAlt size={30} className="text-[#FFFFFF]"/>
                    <div>
                        <p className="text-3xl font-medium">8</p>
                        <p>completed projects</p>
                    </div>
                </div>
                <div className="bg-[#f26e56] p-5 rounded-lg flex items-center gap-3">
                    <TbCancel size={30} className="text-[#FFFFFF]"/>
                    <div>
                        <p className="text-3xl font-medium">2</p>
                        <p>canceled projects</p>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Page
