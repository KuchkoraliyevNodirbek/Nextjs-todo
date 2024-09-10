import { TodoCard } from "@/components/todo-card/todo-card";
import { getData } from "@/service/query/get-todos";
import Link from "next/link";

export default async function Home() {
  const data = await getData();

  return (
    <>
      <section className="sticky top-0 bg-primary z-50 mb-5">
        <div className="container flex flex-col justify-center items-center py-3 gap-5">
          <h1 className="text-center text-xl font-black text-white">
            Todo List
          </h1>
          <Link href={"/create-todo"}>
            <button className="p-3 bg-blue-500 hover:bg-blue-700 transition-all text-white font-bold rounded-lg w-80">
              create todo
            </button>
          </Link>
        </div>
      </section>
      <div className="container py-5">
        <div className="">
          {data.length == 0 ? (
            <p>Empty List!</p>
          ) : (
            <>
              <div className="flex flex-col gap-5">
                {data.map((item) => (
                  <TodoCard key={item.id} {...item} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
