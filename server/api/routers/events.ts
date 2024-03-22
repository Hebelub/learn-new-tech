import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: "drizzle" });

export const eventsRouter = router({
    getAll: publicProcedure.query(async () => {
        return db.select().from(events).all();
    }),
});
