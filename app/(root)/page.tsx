import {auth, signOut} from "@/auth";
import {redirect} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form"
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline,IoNotificationsOutline } from "react-icons/io5";

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signIn");
    }

    return (
        <main className="w-full">
            <header className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Image src={session?.user?.image ?? ""} alt="profile" width={50} height={20}
                           className="rounded-full "/>
                    <div className="flex flex-col gap-1">
                        {session &&
                            <p className="md:text-2xl text-xl font-medium">Hi, {session.user?.name} &#128075;</p>}
                        <p className="text-gray-500">Your daily adventure starts now</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className="flex items-center gap-1 bg-[#f26e56] p-4 rounded-[2rem]">
                        <Link href="/create/task" className="p-1 bg-[#FFFFFF] rounded-full">
                            <IoMdAdd size={20} className="text-[#f26e56]"/>
                        </Link>
                        <Link href="/create/task" className="text-[#FFFFFF]">create task</Link>
                    </button>

                    <Form action="/" className="relative">
                        <input type="text" defaultValue="" name="query" placeholder="Search tasks..." className="p-4 w-full rounded-xl outline-none bg-[#e1e9ef]"/>
                        <div className="p-2 bg-[#ecf0f7] rounded-full absolute right-2 top-2">
                            <IoSearchOutline size={20} />
                        </div>
                    </Form>

                    <div className="p-4 bg-[#e1e9ef] rounded-xl">
                        <IoNotificationsOutline size={20} />
                    </div>
                </div>
            </header>

            <div>
                <p>{session.user?.id} This is the user id</p>
            </div>
            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button
                    type="submit"
                    className="py-1.5 px-4 rounded-xl bg-red-400 text-[#FFFFFF]"
                >
                    Log out
                </button>
            </form>
        </main>
    );
}
