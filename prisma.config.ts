import "dotenv/config";
import { defineConfig } from "prisma/config";
// import { PrismaNeon } from "@prisma/adapter-neon";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});