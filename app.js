import { readFile } from "node:fs/promises"; // On n'importe le module FS avec les Promise
console.log("Node.js");
const content = await Promise.all([
  readFile("./demo.txt", { encoding: "utf-8" }),
  readFile("./app.js", { encoding: "utf-8" }),
]);
console.log(content);
