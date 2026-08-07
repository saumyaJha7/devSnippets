import { initDB } from "@/db/db";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        console.log("Initializing database...");
        await initDB();
        console.log("Database ready");
      } catch (err) {
        console.error(err);
      }
    };
    initializeDatabase();
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
