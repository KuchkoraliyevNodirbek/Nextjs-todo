"use server";

import { revalidateTag } from "next/cache";

interface TodoData {
  title: string;
  description: string;
}

export const updateTodo = async (id: number, data: TodoData) => {
  const url = process.env.APP_URL;
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedTodo = await res.json();
    return updatedTodo;
  } catch {
  } finally {
    revalidateTag("todos");
  }
};
