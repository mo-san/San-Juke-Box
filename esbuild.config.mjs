import { build } from "esbuild";
import { stat } from "fs";
import { copy } from "fs-extra";
import serve, { error as logError, log } from "create-serve";

const isDevelopment = process.env.NODE_ENV === "development";
const watchChanges = process.argv.slice(2).includes("--watch");
const distRoot = "dist";

[
  ["src/index.html", "dist/index.html"],
].map(async ([src, dest]) => {
  let mtimeSrc = 0;
  let mtimeDest = 0;
  // noinspection JSVoidFunctionReturnValueUsed
  await Promise.all([
    stat(src, (err, stats) => mtimeSrc = stats?.mtime),
    stat(dest, (err, stats) => mtimeDest = stats?.mtime)
  ]);
  await copy(src, dest, {
    overwrite: (mtimeSrc - mtimeDest > 0),
    preserveTimestamps: true
  });
});

build({
  entryPoints: ["src/index.ts"],
  outdir: distRoot,
  bundle: true,
  charset: "utf8",
  minify: !isDevelopment,
  platform: "browser",
  sourcemap: isDevelopment,
  target: ["es2020"],
  tsconfig: "tsconfig.json",
  write: true,
  watch: watchChanges && {
    onRebuild(error) {
      serve.update();
      error ? logError("× Failed") : log(`[${new Date().toLocaleString()}] ✓ Updated`);
    },
  },
}).then(_ => {});

// options for Serve
watchChanges && serve.start({
  port: 7000,
  root: distRoot,
});
