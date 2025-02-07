import {auth, signOut} from "@/auth";
import {redirect} from "next/navigation";
import Image from "next/image";

export default async function Home() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signIn");
    }

    return (
        <main>
            <div className="flex items-center gap-3">
                <Image src={session?.user?.image ?? ""} alt="profile" width={50} height={20}
                       className="rounded-full "/>
                <div className="flex flex-col gap-1">
                    {session && <p className="md:text-2xl text-xl font-medium">Hi, {session.user?.name} &#128075;</p>}
                    <p className="text-gray-500">Your daily adventure starts now</p>
                </div>
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
