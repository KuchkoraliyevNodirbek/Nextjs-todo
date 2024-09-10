"use server";

import { revalidateTag } from "next/cache";

const url = process.env.APP_URL;

export interface dataType {
  title: string;
  description: string;
  id: number;
}

export const getTodoById = async (id: string): Promise<dataType | null> => {
  try {
    const res = await fetch(`${url}/todos/${id}`, {
      next: { tags: ["todos"] },
    });

    if (!res.ok) {
      throw new Error("Todo not found");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const err = (error as Error).message;
    throw new Error(err);
  } finally {
    revalidateTag("todos");
  }
};
