import React from "react";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";

const DailyTask = ({ task }) => {
  return (
      <div className="bg-[#fefeff] p-4 rounded-lg flex flex-col gap-3">
        {task.project && (
          <p className="text-xs text-[#FFFFFF] bg-[#f26e56] p-2 rounded-2xl capitalize self-start">
            {task.project.name}
          </p>
        )}
        <p className="font-medium text-lg">{task.title}</p>
        <p className="text-sm text-gray-500">{task.description}</p>
        <div className="flex flex-col gap-3">
          {task.project && (
            <div className="flex justify-between items-center font-medium">
              <p>Project Progress</p>
              <p>{task.project.progress}%</p>
            </div>
          )}
          {task.project && <ProgressBar progress={task.project.progress} />}
        </div>
        <div className="mt-4">
          <hr />
          <div className="flex justify-between">
              <Image
                  src={task?.assignedTo?.image ?? ""}
                  alt={task?.assignedTo?.name ?? ""}
                  width={30}
                  height={30}
                  className="mt-2 rounded-full"
              />
              <p className="text-sm text-gray-500 font-medium self-end">
                  {
                  task.deadline.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true // Use AM/PM format, set to false for 24-hour format
                  })
                  }
              </p>
          </div>
        </div>
      </div>
  );
};
export default DailyTask;
