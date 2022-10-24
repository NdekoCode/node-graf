import { exec } from "node:child_process";
const [node, _, file] = process.argv;
exec("dir", (error, out, stderr) => {
  console.log({ error, out, stderr });
});
