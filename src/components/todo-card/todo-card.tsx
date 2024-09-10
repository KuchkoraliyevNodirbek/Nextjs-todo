"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { deleteTodo } from "@/service/mutation/delete-todo";
import Link from "next/link";
import { EditIcon } from "@/assets/svgs/EditIcon";
import { DeleteIcon } from "@/assets/svgs/DeleteIcon";
import { Loading } from "../loading/loading";

interface dataType {
  title: string;
  description: string;
  id: number;
}

export const TodoCard: React.FC<dataType> = ({ description, id, title }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTodo(id);
      router.refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative shadow-lg border border-gray-300 rounded-xl p-6 max-w-xl transition-all duration-200 transform ${loading ? "opacity-60 scale-95" : "opacity-100 scale-100"
        } bg-gray-50 hover:shadow-2xl`}
    >
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Title:</h1>
        <p className="text-lg text-gray-700 break-all">{title}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Description:</h2>
        <p className="text-base text-gray-600 break-all">{description}</p>
      </div>
      <div className="flex gap-4 items-center absolute right-4 top-4">
        <button
          className="hover:scale-110 transition-all ease-in-out text-red-500 hover:text-red-700"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <Loading /> : <DeleteIcon />}
        </button>

        <Link href={`/edit-todo/${id}`}>
          <div className="hover:scale-110 transition-all ease-in-out text-yellow-500 hover:text-yellow-700">
            <EditIcon />
          </div>
        </Link>
      </div>
    </div>
  );
};
