import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
});

export const counters = sqliteTable('counters', {
  id: text('id').primaryKey(),
  project_id: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  name: text('name').notNull(),
  value: integer('value').notNull().default(1),
  patternLength: integer('pattern_length'), // NULL for simple counters
  createdAt: integer('created_at').notNull()
})