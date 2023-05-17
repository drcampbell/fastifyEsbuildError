#!/usr/bin/env node
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./index.mjs"],
  bundle: true,
  outfile: "dist/index.js",
  format: "esm",
  minify: true,
  target: "esnext",
  platform: "node",
  banner: {
    js: `
      import { fileURLToPath } from 'url';
      import { createRequire as yix6bKft } from "module";
      import * as path from "path";
      const require = yix6bKft(import.meta.url);
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
    `,
  },
});
