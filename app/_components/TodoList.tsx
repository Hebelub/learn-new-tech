"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";

export default function TodoList() {
    const getTodos = trpc.getTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation({
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