import { stat, open } from "node:fs/promises"; // On n'importe le module FS avec les Promise
try {
  const info = await stat("./demo.txt");
  if (info) {
    const file = await open("./demo.txt", "a");
    file.write("Apprendre le developpement");
    file.close();
  }
  console.log(info);
} catch (err) {
  console.log("Erreur", err);
}
