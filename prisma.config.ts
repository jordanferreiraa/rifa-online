import "dotenv/config";
import { defineConfig } from "prisma/config";
// import { PrismaNeon } from "@prisma/adapter-neon";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
  },
});