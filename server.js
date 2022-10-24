import { createServer } from "node:http";

const port = process.env.PORT || 3000;
const server = createServer((req, res) => {
  let body = "";
  // On on va detecter
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("close", () => {
    res.write("Salut " + JSON.stringify(body));
    res.end();
  });
});
server.listen(port);
