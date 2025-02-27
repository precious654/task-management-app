import React from "react";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { IoMdAdd, IoMdCheckmarkCircleOutline } from "react-icons/io";
import Form from "next/form";
import { IoSearchOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { GoClock } from "react-icons/go";
import { MdTaskAlt } from "react-icons/md";
import { TbCancel } from "react-icons/tb";
import projects from "@/data/projects.json";
import image from "@/public/assets/54b19ada-d53e-4ee9-8882-9dfed1bf1396.jpg";
import image2 from "@/public/assets/portrait-man-cartoon-style1.jpg";
import image3 from "@/public/assets/portrait-man-cartoon-style.jpg";
import ProgressCircle from "@/components/ProgressCircle";
import {redirect} from "next/navigation";

const Page = async () => {
  const session = await auth();
  const ongoingProjects = projects.filter((item) => item.status === "ongoing");
  const pendingProjects = projects.filter((item) => item.status === "pending");
  const images = [image, image2, image3];

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
              </div>
          </header>

          <div className="lg:flex items-center lg:justify-between grid grid-cols-2 gap-4 mt-10">
              <div className="bg-[#ffc247] p-5 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="p-3 rounded-full bg-[#e4ae40]">
                      <GoClock size={30} className="text-[#FFFFFF]"/>
                  </div>
                  <div className="text-sm block lg:hidden">
                      <p className="font-medium">Pending</p>
                      <p>10 projects</p>
                  </div>
                  <div className="hidden lg:block">
                      <p className="text-3xl font-medium">10</p>
                      <p className="text-sm">pending projects</p>
                  </div>
              </div>

              <div className="bg-[#5694f2] p-5 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="p-3 rounded-full bg-[#4d84db]">
                      <TfiReload size={30} className="text-[#FFFFFF]"/>
                  </div>
                  <div className="text-sm block lg:hidden">
                      <p className="font-medium">Ongoing</p>
                      <p>12 projects</p>
                  </div>
                  <div className="hidden lg:block">
                      <p className="text-3xl font-medium">12</p>
                      <p>ongoing projects</p>
                  </div>
              </div>

              <div className="bg-[#53c2c5] p-5 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="p-3 rounded-full bg-[#4aafb0]">
                      <MdTaskAlt size={30} className="text-[#FFFFFF]"/>
                  </div>
                  <div className="text-sm block lg:hidden">
                      <p className="font-medium">Completed</p>
                      <p>8 projects</p>
                  </div>
                  <div className="hidden lg:block">
                      <p className="text-3xl font-medium">8</p>
                      <p>completed projects</p>
                  </div>
              </div>

              <div className="bg-[#f26e56] p-5 rounded-lg flex items-center gap-3 cursor-pointer">
                  <div className="p-3 rounded-full bg-[#da624c]">
                      <TbCancel size={30} className="text-[#FFFFFF]"/>
                  </div>
                  <div className="text-sm block lg:hidden">
                      <p className="font-medium">Canceled</p>
                      <p>2 projects</p>
                  </div>
                  <div className="hidden lg:block">
                      <p className="text-3xl font-medium">2</p>
                      <p>canceled projects</p>
                  </div>
              </div>
          </div>
          <p className="mt-10 font-semibold text-2xl">Ongoing Projects</p>

          <div className="mt-5 no-scrollbar lg:h-[53.5%] overflow-y-auto">
              <div className="lg:grid grid-cols-3 gap-5 flex flex-col">
                  {ongoingProjects.map((item) => {
                      return (
                          <div
                              key={item.id}
                              className="p-2 border-2 border-[#a4a4a4] shadow-lg shadow-[#010100] rounded-lg flex items-center justify-between"
                          >
                              <div className="flex flex-col gap-2">
                                  <Link href={`/projects/${item.id}`} className="font-medium">
                                      {item.name}
                                  </Link>
                                  <Link
                                      href={`/projects/${item.id}`}
                                      className="flex items-center gap-1 font-semibold text-sm"
                                  >
                                      <IoMdCheckmarkCircleOutline size={20}/>
                                      <p>{item.tasks.length} tasks</p>
                                  </Link>
                                  <Link href={`/projects/${item.id}`} className="text-sm">
                                      Team
                                  </Link>
                                  <div className="flex items-center">
                                      {images.map((image, index) => {
                                          return (
                                              <div key={index} className="ml-[-0.3rem]">
                                                  <Image
                                                      src={image}
                                                      alt="profile"
                                                      className="w-6 h-6 rounded-full"
                                                      style={{zIndex: images.length - index}}
                                                  ></Image>
                                              </div>
                                          );
                                      })}
                                      <div
                                          className="p-1 rounded-full bg-orange-300 relative ml-[-0.3rem] cursor-pointer">
                                          <IoMdAdd size={17} className="text-[#FFFFFF]"/>
                                      </div>
                                  </div>
                              </div>
                              <ProgressCircle progress={item.progress}/>
                          </div>
                      );
                  })}
              </div>
          </div>
      </main>
  );
};
export default Page;
