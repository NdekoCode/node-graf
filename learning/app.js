import { readdir, stat } from "node:fs/promises";
console.time("code");
function getSizeToKb(v) {
  return parseFloat(v.size).toFixed(1) + "kb";
}
function getInfos(file, fileInfo) {
  return file.isDirectory()
    ? `D - ${file.name}`
    : `F - ${file.name} - ${getSizeToKb(fileInfo)}`;
}
const files = await readdir("./", { withFileTypes: true });
await Promise.allSettled(
  files.map(async (file) => {
    const infos = await stat(file.name);
    console.log(getInfos(file, infos));
  })
);
console.timeEnd("code");
