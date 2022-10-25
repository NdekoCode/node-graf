import { createServer } from "node:http";
import { deleteTodo, index, postTodo, update } from "./functions/api/todos.js";
import NotFoundError from "./functions/NotFoundError.js";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
const port = process.env.PORT || 3000;
const server = createServer(async (req, res) => {
  // Etat donnée que je sais que mon application ne va travailler qu'avec du json alors je ne configure qu'un seul header pour cela
  res.setHeader("Content-Type", "application/json"); // Ce header permet d'expliquer ce que vous renvoyer
  try {
    // On va recuperer l'url
    const url = new URL(req.url, `http://${req.headers.host}`);
    const endpoint = `${req.method}:${url.pathname}`; // Sera une variable dynamic, soit "GET:/leChemin" ou "POST:/leChemin" ou "PUT:/leChemin" ou encore "DELETE:/leChemin"
    let results;
    switch (endpoint) {
      case "GET:/":
        res.setHeader("Content-Type", "text/html");
        const file = await readFile("index.html", {
          encoding: "utf8",
        });
        res.write(file);
        break;
      case "GET:/todos":
        results = await index(req, res);
        break;
      case "POST:/todos":
        results = await postTodo(req, res);
        break;
      case "DELETE:/todos":
        results = await deleteTodo(req, res, url);
        break;
      case "PUT:/todos":
        results = await update(req, res, url);
        break;
      default:
        // SI l'URL correspond aux todos alors on lui envoies les todos sinon on envoie une erreur 404
        res.writeHead(404, "Page introuvable");
    }
    if (results) {
      res.write(JSON.stringify(results, null, 2));
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.writeHead(404, "Page introuvable");
    } else {
      throw err;
    }
  } finally {
    res.end();
  }
});
server.listen(port);
