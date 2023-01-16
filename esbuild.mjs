import { build } from "esbuild";
import { copy, emptyDirSync } from "fs-extra";
import serve, { error as logError, log } from "create-serve";

const watchChanges = process.argv.slice(2).includes("--watch");
const isDevelopment = watchChanges || process.env.NODE_ENV === "development";
const distRoot = "dist_es";

function copyAssets() {
  const targets = [
    ["src/index.html", `${distRoot}/index.html`],
    ["src/index.css", `${distRoot}/index.css`],
    ["src/sanitize.css", `${distRoot}/sanitize.css`],
    ["src/assets", `${distRoot}/assets`],
    ["src/img", `${distRoot}/img`],
    ["src/lib", `${distRoot}/lib`],
  ];
  Promise.all(targets.map(async ([src, dest]) => copy(src, dest)));
}

emptyDirSync(distRoot);
copyAssets();

// options for esbuild
build({
  entryPoints: ["src/index.tsx"],
  outdir: distRoot,
  bundle: true,
  charset: "utf8",
  minify: !isDevelopment,
  platform: "browser",
  sourcemap: true,
  target: ["es2020"],
  tsconfig: "tsconfig.json",
  write: true,
  watch: watchChanges && {
    onRebuild(error) {
      copyAssets();
      serve.update();
      error ? logError("× Failed") : log(`[${new Date().toLocaleString()}] ✓ Updated`);
    },
  },
}).catch((reason) => {logError(reason)});

// options for 'Serve'
watchChanges && serve.start({
  port: 7000,
  root: distRoot,
});
