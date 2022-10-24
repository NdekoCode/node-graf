import { createServer } from "node:http";
import { json } from "node:stream/consumers";

const port = process.env.PORT || 3000;
const server = createServer(async (req, res) => {
  const data = await json(req);
  res.write(`Salut ${data.name}`);
  res.end();
});
server.listen(port);
