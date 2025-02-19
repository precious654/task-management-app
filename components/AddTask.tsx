"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import addTask from "@/actions/addTask";
import {toast} from "react-toastify";
import {IoHomeOutline} from "react-icons/io5";
// import { useQueryState } from "nuqs";

const AddTask = () => {
  // const [assignedTo, setAssignedTo] = useQueryState("email");

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTask(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Task added successfully.");
      console.log(data);
    }
  };

  return (
    <main className="flex flex-col gap-5 items-center justify-center w-full py-6">
      <div className="flex items-center justify-between md:w-6/12 w-full">
        <p className="text-3xl font-semibold">New Task</p>
        <Link href="/" className="p-2.5 bg-[#e1e9ef] rounded-lg">
          <IoHomeOutline size={20}/>
        </Link>
      </div>
      <form
          action={clientAction}
          className="md:w-6/12 w-full flex flex-col gap-4"
      >
        <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="form-input"
        />
        <input
            type="datetime-local"
          name="deadline"
          placeholder="Date"
          className="form-input"
        />
        <div className="w-full relative">
          <input
            type="text"
            name="assignedTo"
            placeholder="assignee"
            className="form-input w-full"
          />
          <div className="absolute right-4 top-5">
            <FiSearch size={20} />
          </div>
        </div>
        <textarea
          name="description"
          id=""
          cols={30}
          rows={10}
          placeholder="Add your task details"
          className="form-input w-full"
        ></textarea>
        <select name="status" id="" className="form-input">
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          type="submit"
          className="bg-[#f26f57] text-[#ebeeed] py-3 rounded-lg"
        >
          Create Task
        </button>
      </form>
      <Link href="/create/project" className="underline text-[#f3836e]">
        You can create a project instead
      </Link>
    </main>
  );
};
export default AddTask;
