"use client"

import React from 'react'
import { GoHome } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineTask } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="p-3 bg-[#fefeff] text-[#f7a696] w-full rounded-lg lg:hidden">
            <ul className="flex items-center w-full justify-between">
                <li>
                    <Link href="/" className={`${pathname === "/" ? "text-[#f26e56]" : ""}`}>
                        <GoHome size={20} />
                    </Link>
                </li>
                <li>
                    <Link href="/calendar" className={`${pathname.includes("calendar") ? "text-[#f26e56]" : ""}`}>
                        <IoCalendarClearOutline size={20} />
                    </Link>
                </li>
                <li className={`${pathname.includes("task") ? "bg-[#f26e56]" : ""} p-2 rounded-full bg-[#f7a696]`}>
                    <Link href="/create/task" className={`${pathname.includes("create") ? "text-[#f26e56]" : ""}`}>
                        <IoMdAdd size={26} className="text-[#FFFFFF]" />
                    </Link>
                </li>
                <li>
                    <Link href="/projects" className={`${pathname.includes("projects") ? "text-[#f26e56]" : ""}`}>
                        <MdOutlineTask size={20} />
                    </Link>
                </li>
                <li>
                    <Link href="/tasks" className={`${pathname.includes("tasks") ? "text-[#f26e56]" : ""}`}>
                        <LuListTodo size={20} />
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
export default Navbar