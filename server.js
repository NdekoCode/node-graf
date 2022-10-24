import { createServer } from "node:http";
const port = process.env.PORT || 3000;
const server = createServer((req, res) => {
  console.log(req.headers.host);
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url);
  console.log(url.searchParams.get("name"));
  res.write(`Salut ${url.searchParams.get("name")}`);
  res.end();
});
server.listen(port);
