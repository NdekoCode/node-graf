import { createReadStream, createWriteStream } from "node:fs";
import { stat } from "node:fs/promises";
let read = 0;
const file = "./video.mp4";
const { size } = await stat(file);
const stream = createReadStream(file);
stream.on("data", (chunk) => {
  read += chunk.length;
  console.log(Math.round((read / size) * 100));
});
stream.on("close", () => {
  console.log("Closed");
});
const write = createWriteStream("video-copy.mp4");
stream.pipe(write); // On créer une copie et c'est bien plus performant car on a pas été obliger de sauvegarder l'entiereté du fichier en memoire
