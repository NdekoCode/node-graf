import fs, { readFileSync } from "node:fs";
console.log("Node.js");
const content = readFileSync("./demo.txt", { encoding: "utf-8" });
console.log(content);
fs.readFile("./demo.txt", { encoding: "utf-8" }, (err, data) => {
  if (err) return err;
  console.log(data);
});
