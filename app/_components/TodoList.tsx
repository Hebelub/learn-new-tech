"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


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
            <div className="my-5">
                {getTodos?.data?.map((todo) => (
                    <div key={todo.id} className="flex gap-3 my-2">
                        <Checkbox
                            id={`check-${todo.id}`}
                            checked={!!todo.done}
                            onCheckedChange={async (checked) => {
                                const doneValue = checked ? 1 : 0;
                                setDone.mutate({
                                  id: todo.id,
                                  done: doneValue,
                                });
                              }}
                        />
                        <Label htmlFor={`check-${todo.id}`}>
                            {todo.content}
                        </Label>
                    </div>
                ))}
            </div>
            <div className="flex gap-3 items-center">
                <Label htmlFor="content">Content</Label>
                <Input
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="text-black"
                />
                <Button
                    onClick={async () => {
                        if (content.length) {
                            addTodo.mutate(content);
                            setContent("");
                        }
                    }}
                >
                    Add Todo
                </Button>
            </div>
        </div>
    );
}