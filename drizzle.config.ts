import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL! || "file:local.db",
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
