import { router } from './trpc';
import { todosRouter } from './routers/todos';
import { eventsRouter } from './routers/events';

export const appRouter = router({
    todos: todosRouter,
    events: eventsRouter,
});

export type AppRouter = typeof appRouter;
