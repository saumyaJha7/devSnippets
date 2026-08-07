import * as SQLite from "expo-sqlite";

export const initDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync("devSnippets.db");

    await db.execAsync(
      `
        CREATE TABLE IF NOT EXISTS snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            code TEXT,
            language TEXT,
            tags : TEXT,
            isFavourite : INTEGER DEFAULT 0,
            createdAT : TEXT DEFAULT CURRENT_TIMESTAMP,
            updatedAt : TEXT 
        );
        `,
    );
    return db;
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};
