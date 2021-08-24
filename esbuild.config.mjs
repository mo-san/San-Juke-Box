import { build } from "esbuild";
import { copy, emptyDir } from "fs-extra";
import serve, { error as logError, log } from "create-serve";

const isDevelopment = process.env.NODE_ENV === "development";
const watchChanges = process.argv.slice(2).includes("--watch");
const distRoot = "dist";

(async () => {
  await emptyDir("dist");

  // copy assets
  [
    ["src/index.html", "dist/index.html"],
  ].map(async ([src, dest]) => {
    await copy(src, dest);
  });

  // options for esbuild
  build({
    entryPoints: ["src/index.tsx"],
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

  // options for 'Serve'
  watchChanges && serve.start({
    port: 7000,
    root: distRoot,
  });
})();
