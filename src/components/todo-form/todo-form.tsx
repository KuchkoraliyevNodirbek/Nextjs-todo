"use client";

import { useRouter } from "next/navigation";
import React from "react";
 import { useForm } from "react-hook-form";
import { createTodo } from "@/service/mutation/create-todo";

interface DataType {
  title: string;
  description: string;
  id: number;
}

export const TodoForm = () => {
  const { register, handleSubmit } = useForm<DataType>();
  const navigate = useRouter();
  const [loading, startTransition] = React.useTransition();

  const onSubmit = async (data: DataType) => {
    try {
      startTransition(async () => {
        await createTodo(data);
        navigate.push("/");
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="border-2 border-gray-200 max-w-4xl mx-auto py-8 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
            <div className="w-full bg-white rounded-lg shadow-md border border-gray-300 sm:max-w-md">
              <div className="p-8 space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-blue-800">
                    Title
                  </label>
                  <input
                    {...register("title", { required: true })}
                    placeholder="Enter title"
                    className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-blue-800">
                    Description
                  </label>
                  <input
                    {...register("description", { required: true })}
                    placeholder="Enter description"
                    className="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                    type="text"
                  />
                </div>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-white transition-all duration-300"
                  type="submit"
                >
                  {loading ? "Creating..." : "Create Todo"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
