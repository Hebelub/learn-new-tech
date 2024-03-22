"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

export default function TodoList({
    initialTodos
}: {
    initialTodos: Awaited<ReturnType<(typeof serverClient)["todos"]["getAll"]>> 
}) {
    const getTodos = trpc.todos.getAll.useQuery(undefined, {
        initialData: initialTodos,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    const addTodo = trpc.todos.create.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });
    const setDone = trpc.todos.setDone.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });

    const [content, setContent] = useState("");

    return (
        <div>
            <div className="text-black my-5 text-3xl">
                {getTodos?.data?.map((todo) => (
                    <div key={todo.id} className="flex gap-3 items-center">
                        <input
                            id={`check-${todo.id}`}
                            type="checkbox"
                            checked={!!todo.done}
                            onChange={async () => {
                                setDone.mutate({
                                    id: todo.id,
                                    done: todo.done ? 0 : 1,
                                });
                            }}
                            style={{ zoom: 1.5 }}
                        />
                        <label htmlFor={`check-${todo.id}`}>{todo.content}</label>
                    </div>
                ))}
            </div>
            <div className="flex gap-3 items-center">
                <label htmlFor="content">Content</label>
                <input
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="text-black"
                />
                <button 
                    onClick={async () => {
                        if (content.length) {
                            addTodo.mutate(content);
                            setContent("");
                        }
                    }}
                >
                    Add Todo
                </button>
            </div>
        </div>
    );
}