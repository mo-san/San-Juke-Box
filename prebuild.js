// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const fs = require("fs/promises");

async function replace() {
  const path = "node_modules/textalive-app-api/dist/textalive-app-api.d.ts";
  const target = /^declare class Char extends TextUnit implements IChar {/m;
  const content = await fs.readFile(path, {encoding: "utf-8"});
  const result = content.replace(target, "export declare class Char extends TextUnit implements IChar {");
  await fs.writeFile(path, result, {flag: "r+"});
}

replace();
