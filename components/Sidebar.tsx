import React from 'react'
import { signOut } from "@/auth"
import SidebarLinks from "@/components/SidebarLinks";


const Sidebar = () => {
    return (
        <nav
            className="w-2/12 p-2 bg-[#fefeff] text-[#f26e56] lg:flex flex-col rounded-lg justify-between h-full hidden">
            <SidebarLinks />
            <form action={async () => {
                "use server";
                await signOut();
            }}>
                <button
                    type="submit"
                    className="sidebar-link"
                >
                    Log out
                </button>
            </form>
        </nav>
    )
}
export default Sidebar
