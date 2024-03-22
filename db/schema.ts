import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
    id: integer("id").primaryKey(),
    content: text("content"),
    done: integer("done"),
});

export const events = sqliteTable("events", {
    id: integer("id").primaryKey(),
    location: text("location"),
    start_time: text("start_time"), // Store as text in ISO 8601 format
    end_time: text("end_time"), // Store as text in ISO 8601 format
    description: text("description"),
    organizer: text("organizer"), // Later we can add a foreign key to a users table
});
