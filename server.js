import { createReadStream } from "node:fs";
import { createServer } from "node:http";
const port = process.env.PORT || 3000;
const server = createServer((req, res) => {
  console.log(req.url, req.statusCode, req.statusMessage, req.method);
  const file = createReadStream("index.html");
  // Le serveur renvois une en-tete contenant le status de la reponse et il dit qu'il envois du text HTML
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  file.pipe(res, { end: false });
  file.on("end", () => {
    res.end();
  });
});
server.listen(port, () => console.log("listening at the port " + port));
