import { readFile, writeFile } from "node:fs/promises"; // On n'importe le module FS avec les Promise
console.log("Node.js");
await writeFile("./demo.txt", "Bonjour les gens \n", {
  flag: "a+",
});
//
// console.log(content);
