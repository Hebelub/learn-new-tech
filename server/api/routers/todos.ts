import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { z } from "zod";

import { publicProcedure, router } from "../trpc"; // Adjust the path as necessary
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });

export const todosRouter = router({
    getAll: publicProcedure.query(async () => {
        return db.select().from(todos).all();
    }),
    create: publicProcedure.input(z.string()).mutation(async (opts) => {
        db.insert(todos).values({ content: opts.input, done: 0 }).run();
        return true;
    }),
    setDone: publicProcedure
        .input(
            z.object({
                id: z.number(),
                done: z.number(),
            })
        )
        .mutation(async (opts) => {
            db
                .update(todos)
                .set({ done: opts.input.done })
                .where(eq(todos.id, opts.input.id))
                .run();
            return true;
        }),
});
