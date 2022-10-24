import { exec, spawn } from "node:child_process";
import { watch } from "node:fs/promises";
const [node, _, file] = process.argv;
function spawnNode() {
  const pr = spawn(node, [file]);
  // On écrit sur le processus de sortir(sur l'affichage)
  pr.stdout.pipe(process.stdout); // stdout: pour la sortie
  // On écrit sur le processus d'erreur si il y en a lors de l'execution des commandes
  pr.stderr.pipe(process.stderr); // stderr: pour la sortie avec des erreurs

  pr.on("close", (code) => {
    // SI jamais le code est superieur à Zero alors on renvois une erreur et on arrete le script
    if (code > 0) {
      // S'il y a une erreur on sort du processus et on lui passe l'erreur
      process.exit(code); // exit() permet de fermer le processus avec un code particulier
    }
  });
  return pr;
}
let childNodeProcess = spawnNode();
const watcher = watch("./", { recursive: true });
for await (const event of watcher) {
  if (event.filename.endsWith(".js")) {
    childNodeProcess.kill("SIGKILL"); // On kill le processus et on envois un signal pour kill le processus
    console.log(`Reload ${event.eventType} ${event.filename}`);
    childNodeProcess = spawnNode();
  }
}
