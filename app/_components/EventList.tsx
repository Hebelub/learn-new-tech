"use client";
import { useState } from "react";

import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

export default function EventList({
    initialEvents
}: {
    initialEvents: Awaited<ReturnType<(typeof serverClient)["events"]["getAll"]>>
}) {
    const getEvents = trpc.events.getAll.useQuery(undefined, {
        initialData: initialEvents,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const [content, setContent] = useState("");

    return (
        <div className="text-black my-5 text-3xl">
            {JSON.stringify(getEvents?.data)}
        </div>
    );
}