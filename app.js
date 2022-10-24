import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.write("Hello les Dev");
  res.end();
});
server.listen(3000);
