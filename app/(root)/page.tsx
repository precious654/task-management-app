import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import { IoMdAdd } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import React from "react";
import getDailyTasks from "@/actions/getDailyTasks";
import DailyTask from "@/components/DailyTask";

export default async function Home() {
  const session = await auth();
  const today = new Date();
  const { data, error } = await getDailyTasks();
  if (data) {
    console.log(data);
  } else {
    console.log(error);
  }

  const pendingTasks = data?.filter((task) => task.status === "pending");
  const ongoingTasks = data?.filter((task) => task.status === "ongoing");
  const completedTasks = data?.filter((task) => task.status === "completed");

  if (!session) {
    redirect("/auth/signIn");
  }

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
              <p className="lg:text-2xl text-lg font-medium">
                Hi, {session.user?.name} &#128075;
              </p>
            )}
            <p className="text-gray-500 text-xs lg:text-lg">
              Your daily adventure starts now
            </p>
          </div>
        </div>

        <div className="lg:flex items-center gap-3">
          <button className="hidden lg:flex items-center gap-1 bg-[#f26e56] p-4 rounded-[2rem]">
            <Link href="/create/task" className="p-1 bg-[#FFFFFF] rounded-full">
              <IoMdAdd size={20} className="text-[#f26e56]" />
            </Link>
            <Link
              href="/create/task"
              className="text-[#FFFFFF] text-sm lg:text-lg"
            >
              create task
            </Link>
          </button>

          <Form action="/" className="relative hidden lg:block">
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

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="lg:hidden"
          >
            <button className="p-2 text-[#FFFFFF] bg-[#f26e56] rounded-lg">
              Log out
            </button>
          </form>
        </div>
      </header>
      <div className="mt-10 flex justify-between lg:items-center p-2 rounded-lg lg:border-2 border-[#eeeeef]">
        <div className="flex flex-col gap-1 lg:text-sm text-xs">
          <p className="lg:text-lg text-sm font-medium">
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
        <p className="w-1 hidden lg:block rounded-xl h-14 bg-[#eeeeef]"></p>
        <div className="hidden lg:block">
          <p className="font-medium text-gray-500">Your Daily Tasks</p>
        </div>
        <p className="w-1 hidden lg:block rounded-xl h-14 bg-[#eeeeef]"></p>
        <div className="hidden lg:flex">
          <Link
            href="/projects"
            className="bg-[#f26e56] p-2 rounded-lg text-[#FFFFFF]"
          >
            View Projects
          </Link>
        </div>
        <p className="font-medium text-gray-500 text-xs self-end lg:hidden">
          Your Daily Tasks
        </p>
      </div>

      <div className="lg:grid grid-cols-3 gap-5 lg:gap-7 flex flex-col lg:mt-10 mt-5 lg:h-full">
        <div className="flex flex-col items-center gap-2 lg:h-[59%] border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Pending</p>
          <Link
            href="/create/task"
            className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20} />
          </Link>
          <div className="md:h-[90%] mt-2 overflow-auto no-scrollbar flex flex-col gap-3 w-full">
            {pendingTasks?.length === 0 ? <p>No pending task</p> :
                pendingTasks?.map((task) => {
                  return <DailyTask key={task.id} task={task} />;
                })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:h-[59%] border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Ongoing</p>
          <Link
              href="/create/task"
              className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20}/>
          </Link>
          <div className="md:h-[90%] mt-2 overflow-auto no-scrollbar flex flex-col gap-3 w-full">
            {ongoingTasks?.length === 0 ? <p>No ongoing task</p> :
                ongoingTasks?.map((task) => {
                  return <DailyTask key={task.id} task={task}/>;
                })}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 lg:h-[59%] border-2 border-[#eeeeef] p-3 rounded-lg">
          <p className="font-medium">Completed</p>
          <Link
              href="/create/task"
              className="w-full flex justify-center p-2 border-2 border-[#eeeeef] rounded-lg"
          >
            <IoMdAdd size={20}/>
          </Link>
          <div className="md:h-[90%] mt-2 overflow-auto no-scrollbar flex flex-col gap-3 w-full">
            {completedTasks?.length === 0 ? <p>No completed task</p> :
                completedTasks?.map((task) => {
                  return <DailyTask key={task.id} task={task}/>;
                })}
          </div>
        </div>
      </div>
    </main>
  );
}
