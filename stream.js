import { readFile, writeFile } from "node:fs/promises";
const content = await readFile("./video.mp4");
await writeFile("video-copy.mp4", content);
