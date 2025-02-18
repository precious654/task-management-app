import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import tasks from "@/data/tasks.json";
import ProgressBar from "@/components/ProgressBar";

export default async function Home() {
  const session = await auth();
  const today = new Date();
  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  if (!session) {
    redirect("/auth/signIn");
  }

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
            <Link href="/create/task" className="p-1 bg-[#FFFFFF] rounded-full">
              <IoMdAdd size={20} className="text-[#f26e56]" />
            </Link>
            <Link href="/create/task" className="text-[#FFFFFF] text-sm lg:text-md">
              create task
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
              <IoSearchOutline size={20} />
            </button>
          </Form>
        </div>
      </header>
      {/*<form action={async () => {*/}
      {/*    "use server";*/}
      {/*    await signOut();*/}
      {/*  }}>*/}
      {/*  <button*/}
      {/*    type="submit"*/}
      {/*    className="py-1.5 px-4 rounded-xl bg-red-400 text-[#FFFFFF]"*/}
      {/*  >*/}
      {/*    Log out*/}
      {/*  </button>*/}
      {/*</form>*/}

      <div className="mt-10 flex justify-between md:items-center p-2 rounded-lg md:border-2 border-[#eeeeef]">
        <div className="flex flex-col gap-1 md:text-sm text-xs">
          <p className="md:text-lg text-sm font-medium">
            {today.toLocaleString("en-US", { month: "long" })}
          </p>
          <p className="text-gray-500 font-medium">
            Today is{" "}
            <span>
              {today.toLocaleString("en-US", { weekday: "long" })},{" "}
              {today.toLocaleString("en-US", { dateStyle: "long" })}
            </span>
          </p>
        </div>
        <p className="w-1 hidden md:block rounded-xl h-14 bg-[#eeeeef]"></p>
        <div className="hidden md:block">
          <p className="font-medium text-gray-500">Your Daily Tasks</p>
        </div>
        <p className="w-1 hidden md:block rounded-xl h-14 bg-[#eeeeef]"></p>
        <div className="hidden md:flex">
          <Link href="/projects" className="bg-[#f26e56] p-2 rounded-lg text-[#FFFFFF]">
            View Projects
          </Link>
        </div>
        <p className="font-medium text-gray-500 text-xs self-end md:hidden">
          Your Daily Tasks
        </p>
      </div>

      <div className="md:grid grid-cols-3 gap-5 md:gap-7 flex flex-col md:mt-10 mt-5">
        <div className="flex flex-col items-center gap-2 md:h-[42%] overflow-auto border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Pending</p>
          <Link
            href="/create/task"
            className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20} />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2 md:h-[42%] border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Ongoing</p>
          <Link
            href="/create/task"
            className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20} />
          </Link>
          <div className="flex flex-col gap-5 mt-3 md:overflow-auto no-scrollbar">
            {ongoingTasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className="bg-[#fefeff] p-4 rounded-lg flex flex-col gap-3"
                >
                  <p className="text-xs text-[#FFFFFF] bg-[#f26e56] p-2 rounded-2xl capitalize self-start">
                    {task.project.name}
                  </p>
                  <p className="font-medium text-lg">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center font-medium">
                      <p >Project Progress</p>
                      <p>{task.project.progress}%</p>
                    </div>
                    <ProgressBar progress={task.project.progress} />
                  </div>
                  <div className="mt-4">
                    <hr />
                    <Image src={session.user?.image ?? ""} alt={session.user?.name ?? ""} width={30} height={30} className="mt-2 rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 md:h-[42%] border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Completed</p>
          <Link
            href="/create/task"
            className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
