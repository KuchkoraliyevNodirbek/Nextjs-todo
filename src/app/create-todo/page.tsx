import { TodoForm } from "@/components/todo-form/todo-form";
import React from "react";

const CreateTodo = () => {
  return (
    <>
      <div className="h-screen">
        <h1 className="mb-20 text-center font-black text-white bg-primary p-3 text-xl">
          Create Todo
        </h1>
        <TodoForm />
      </div>
    </>
  );
};

export default CreateTodo;
