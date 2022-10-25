import { createServer } from "node:http";
import { createTodo, findTodos } from "./functions/todos_storage.js";
import { json } from "node:stream/consumers";
const port = process.env.PORT || 3000;
const server = createServer(async (req, res) => {
  // Etat donnée que je sais que mon application ne va travailler qu'avec du json alors je ne configure qu'un seul header pour cela
  res.setHeader("Content-Type", "application/json"); // Ce header permet d'expliquer ce que vous renvoyer
  // On va recuperer l'url
  const url = new URL(req.url, `http://${req.headers.host}`);
  // SI l'URL correspond aux todos alors on lui envoies les todos sinon on envoie une erreur 404
  if (url.pathname === "/todos") {
    if (req.method === "GET") {
      const todos = await findTodos();
      res.write(JSON.stringify(todos));
    } else if (req.method === "POST") {
      const newTodo = await json(req); // On lui envois la requete car c'est la "req" qui contient le todos qu'on vient de poster
      if (newTodo.title) {
        // une fois que l'on a parser notre nouvelle tache on l'envois dans la BD
        const todo = await createTodo(newTodo);
        res.write(JSON.stringify(todo));
      }
    }
  } else {
    res.writeHead(404, "Page introuvable");
  }
  res.end();
});
server.listen(port);
