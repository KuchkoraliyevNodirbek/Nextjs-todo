"use server";

const url = process.env.APP_URL;

export interface dataType {
  title: string;
  description: string;
  id: number;
}

export const getData = async (): Promise<dataType[]> => {
  try {
    const res = await fetch(`${url}/todos`, { next: { tags: ["todos"] } });
    const data = await res.json();
    return data;
  } catch (error) {
    const err = (error as Error).message;
    throw new Error(err);
  }
};
