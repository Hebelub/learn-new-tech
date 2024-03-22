import { serverClient } from "../_trpc/serverClient";

import TodoList from "../_components/TodoList";

export default async function Todo() {
  const todos = await serverClient.todos.getAll();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
       <TodoList initialTodos={todos} />
    </main>
  );
}
