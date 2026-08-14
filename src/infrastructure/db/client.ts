import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';

const expo = openDatabaseSync('knitwise.db');

expo.execAsync("PRAGMA foreign_keys = ON;");

const db = drizzle(expo, { schema })

export default db;