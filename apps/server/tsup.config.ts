import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm"],
  outDir: "dist",
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  bundle: true,
  noExternal: ["@octodock/octolog", "@octodock/prisma", "@octodock/queue"],
});
