"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateTodo } from "@/service/mutation/edit-todo";

interface TodoFormData {
  title: string;
  description: string;
}

interface EditFormProps {
  todoId: number;
  currentTitle: string;
  currentDescription: string;
}

export const EditForm: React.FC<EditFormProps> = ({
  todoId,
  currentTitle,
  currentDescription,
}) => {
  const { register, handleSubmit } = useForm<TodoFormData>({
    defaultValues: {
      title: currentTitle,
      description: currentDescription,
    },
  });
  const router = useRouter();
  const [loading, startTransition] = React.useTransition();

  const onSubmit = async (data: TodoFormData) => {
    startTransition(async () => {
      try {
        await updateTodo(todoId, data);
        router.push("/");
      } catch (error) {
        const err = (error as Error).message;
        throw new Error(err);
      }
    });
  };

  return (
    <div className="border-2 border-indigo-300 p-8 max-w-4xl mx-auto py-8 bg-gradient-to-r from-indigo-50 to-purple-100 shadow-lg rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center px-8 py-10 mx-auto">
          <div className="w-full bg-white rounded-xl shadow-md border border-indigo-200 sm:max-w-md">
            <div className="p-8 space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-purple-800">
                  Title
                </label>
                <input
                  {...register("title", { required: true })}
                  placeholder="Enter title"
                  className="bg-white border border-indigo-300 text-purple-800 text-sm rounded-lg block w-full p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-purple-800">
                  Description
                </label>
                <input
                  {...register("description", { required: true })}
                  placeholder="Enter description"
                  className="bg-white border border-indigo-300 text-purple-800 text-sm rounded-lg block w-full p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  type="text"
                />
              </div>

              <button
                className="w-full bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-white transition-all duration-300"
                type="submit"
              >
                {loading ? "Loading..." : "Update Todo"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
