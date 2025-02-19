"use client";

import React from "react";
import Link from "next/link";
import addProject from "@/actions/addProject";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";

const AddProject = () => {
  const clientAction = async (formData: FormData) => {
    const { data, error } = await addProject(formData);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Project added successfully");
      console.log(data);
    }
  };

  return (
    <main className="flex flex-col gap-5 items-center justify-center w-full py-6">
      <div className="flex items-center justify-between md:w-6/12 w-full">
        <p className="text-3xl font-semibold">New Project</p>
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
          name="name"
          placeholder="Project Title"
          className="form-input"
        />
        <input
          type="datetime-local"
          name="deadline"
          placeholder="Deadline..."
          className="form-input"
        />
        <textarea
          name="description"
          id=""
          cols={30}
          rows={10}
          placeholder="Add your project details"
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
          Create Project
        </button>
      </form>
    </main>
  );
};
export default AddProject;
