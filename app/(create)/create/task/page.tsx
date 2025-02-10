import React from 'react'
import { FiSearch } from "react-icons/fi";

const Page = () => {
    return (
        <main className="flex flex-col gap-5 items-center justify-center w-full py-6">
            <p className="text-3xl font-semibold md:w-6/12 w-full">New Tasks</p>
            <form action="" className="md:w-6/12 w-full flex flex-col gap-4">
                <input type="text" name="title" placeholder="Task Title" className="form-input"/>
                <input type="date" name="date" placeholder="Date" className="form-input"/>
                <div className="w-full relative">
                    <input type="text" name="assignee" placeholder="assignee" className="form-input w-full"/>
                    <div className="absolute right-4 top-5">
                        <FiSearch size={20} />
                    </div>
                </div>
                <textarea name="details" id="" cols={30} rows={10} placeholder="Add your task details"
                          className="form-input w-full"></textarea>
                <select name="status" id="" className="form-input">
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                </select>
                <input type="text" name="category" id="" placeholder="Task Category" className="form-input"/>
                <button type="submit" className="bg-[#f26f57] text-[#ebeeed] py-3 rounded-lg">Create Task</button>
            </form>
        </main>
    )
}
export default Page
