"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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

    const [isDeleteAlertVisible, setAlertVisible] = useState(false);
    const [todoToDelete, setTodoToDelete] = useState<number | null>(null);

    const deleteTodo = trpc.todos.delete.useMutation({
        onSettled: () => {
            getTodos.refetch();
            setAlertVisible(false); // Close the alert after deletion
        },
    });

    // Handlers
    const handleDelete = (todoId: number) => {
        setTodoToDelete(todoId);
        setAlertVisible(true); // Show the alert to confirm deletion
    };

    const confirmDelete = () => {
        if (todoToDelete !== null) {
            deleteTodo.mutate({ id: todoToDelete });
        }
    };

    return (
        <div>
            <div className="my-5">
                {getTodos?.data?.map((todo) => (
                    <div key={todo.id} className="flex gap-3 my-2 items-center">
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
                        <Button
                            className="p-0 m-0 bg-transparent inline-flex items-center justify-center text-red-500 hover:text-red-600 focus:outline-none"
                            onClick={() => handleDelete(todo.id)}
                            style={{ lineHeight: '1', height: '24px' }} // Example: setting height directly
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
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

                {/* Alert for delete confirmation */}
                {isDeleteAlertVisible && (
                    <AlertDialog open={isDeleteAlertVisible} onOpenChange={setAlertVisible}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the selected todo.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Button onClick={() => setAlertVisible(false)} className="text-white bg-gray-500 hover:bg-gray-700">Cancel</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button onClick={confirmDelete}>Yes, delete it</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

            </div>
        </div>
    );
}