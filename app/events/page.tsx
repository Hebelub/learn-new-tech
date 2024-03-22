import { serverClient } from "../_trpc/serverClient";

import TodoList from "../_components/TodoList";
import EventList from "../_components/EventList";

export default async function Todo() {
  const events = await serverClient.events.getAll();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
       <EventList initialEvents={events} />
    </main>
  );
}
