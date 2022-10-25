import { createServer } from "node:http";
import { deleteTodo, index, postTodo } from "./functions/api/todos.js";
const port = process.env.PORT || 3000;
const server = createServer(async (req, res) => {
  // Etat donnée que je sais que mon application ne va travailler qu'avec du json alors je ne configure qu'un seul header pour cela
  res.setHeader("Content-Type", "application/json"); // Ce header permet d'expliquer ce que vous renvoyer
  // On va recuperer l'url
  const url = new URL(req.url, `http://${req.headers.host}`);
  const endpoint = `${req.method}:${url.pathname}`; // Sera une variable dynamic, soit "GET:/leChemin" ou "POST:/leChemin" ou "PUT:/leChemin" ou encore "DELETE:/leChemin"
  let results;
  switch (endpoint) {
    case "GET:/todos":
      results = await index(req, res);
      break;
    case "POST:/todos":
      results = await postTodo(req, res);
      break;
    case "DELETE:/todos":
      deleteTodo(req, res, url);
      break;
    default:
      // SI l'URL correspond aux todos alors on lui envoies les todos sinon on envoie une erreur 404
      res.writeHead(404, "Page introuvable");
  }
  if (results) {
    res.write(JSON.stringify(results));
  }
  res.end();
});
server.listen(port);
