"use client"

import React from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <nav className="w-2/12 p-2 bg-[#fefeff] text-[#f26e56] md:flex flex-col rounded-lg justify-between h-full hidden">
            <div className="flex flex-col gap-5">
                <Link href="/" className="text-2xl text-center font-semibold">Taskio</Link>
                <ul className="flex flex-col gap-3">
                    <li className={`${pathName == "/" ? "sidebar-link-active": "sidebar-link"}`}>
                        <Link href="/">Dashboard</Link>
                    </li>
                    <li className={`${pathName.includes("tasks") ? "sidebar-link-active": "sidebar-link"}`}>
                        <Link href="/tasks">Tasks</Link>
                    </li>
                    <li className={`${pathName.includes("calendar") ? "sidebar-link-active": "sidebar-link"}`}>
                        <Link href="/calendar">Calendar</Link>
                    </li>
                    <li className={`${pathName.includes("projects") ? "sidebar-link-active": "sidebar-link"}`}>
                        <Link href="/projects">Projects</Link>
                    </li>
                </ul>
            </div>
            <Link href="/settings" className={`${pathName.includes("settings") ? "sidebar-link-active": "sidebar-link"}`}>Settings</Link>
        </nav>
    )
}
export default Sidebar
