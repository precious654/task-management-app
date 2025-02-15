import React from "react";
import Link from "next/link";
import {FcGoogle} from "react-icons/fc";
import {BsFacebook, BsGithub} from "react-icons/bs";
import {auth, signIn} from "@/auth";
import {redirect} from "next/navigation";
import SignUpForm from "@/components/SignUpForm";

const Page = async () => {
    const session = await auth();

    if(session) {
        redirect("/");
    }

    return (
        <main className="flex flex-col gap-6 w-full items-center justify-center py-6">
            <div className="md:w-6/12 w-full flex flex-col gap-3">
                <p className="text-2xl font-semibold">Create Account &#128075;</p>
                <p className="text-gray-300 leading-7">
                    Please register on our Streamline, where you can continue using our services
                </p>
            </div>
            < SignUpForm />
            <div className="md:w-6/12 flex items-center gap-2 w-full">
                <p className="w-full h-0.5 bg-gray-300 rounded-lg"></p>
                <p className="text-gray-300">or</p>
                <p className="w-full h-0.5 bg-gray-300 rounded-lg"></p>
            </div>
            <div className="flex items-center justify-between md:w-6/12 w-full">
                <form action={async () => {
                    "use server"
                    await signIn("google");
                }}>
                    <button type="submit" className="p-2 px-6 border-2 border-[#7b7a7b] rounded-lg">
                        <FcGoogle/>
                    </button>
                </form>
                <form action={async () => {
                    "use server"
                    await signIn("github");
                }}>
                    <button type="submit" className="p-2 px-6 border-2 border-[#7b7a7b] rounded-lg">
                        <BsGithub/>
                    </button>
                </form>
                <button className="p-2 px-6 border-2 border-[#7b7a7b] rounded-lg">
                    <BsFacebook className="text-[#1c78f2]"/>
                </button>
            </div>
            <div className="mt-14">
                <p>
                    Already have an account?
                    <span>
                        <Link href="/auth/signIn" className="underline text-[#f3836e]"> Sign in instead</Link>
                    </span>
                </p>
            </div>
        </main>
    )
}
export default Page
