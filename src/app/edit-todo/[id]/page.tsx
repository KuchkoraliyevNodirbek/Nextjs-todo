import { EditForm } from "@/components/edit-form/edit-form";
import { getTodoById } from "@/service/query/by-id-get";

export default async function EditPage({ params }: { params: { id: string } }) {
  const todo = await getTodoById(params.id);

  if (!todo) {
    return <p>Todo not found</p>;
  }

  return (
    <div className="h-screen">
      <h1 className="mb-20 text-center font-black text-white bg-primary p-3 text-xl">
        Edit Todo
      </h1>
      <EditForm
        todoId={parseInt(params.id, 10)}
        currentTitle={todo.title}
        currentDescription={todo.description}
      />
    </div>
  );
}
