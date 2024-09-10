"use server";

import { revalidateTag } from "next/cache";

interface dataType {
  title: string;
  description: string;
  id: number;
}

export const createTodo = async (data: dataType) => {
  const url = process.env.APP_URL;
  try {
    const res = await fetch(`${url}/todos`, {
      method: "POST",

      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const createdData = await res.json();

    return createdData;
  } catch (error) {
  } finally {
    revalidateTag("todos");
  }
};
