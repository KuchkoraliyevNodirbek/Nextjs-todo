"use server";

import { revalidateTag } from "next/cache";

export const deleteTodo = async (id: number) => {
  const url = process.env.APP_URL;
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      method: "DELETE",
    });

    return res;
  } catch (error) {
  } finally {
    revalidateTag("todos");
  }
};
