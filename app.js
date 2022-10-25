import Fastify from "fastify";
import { findTodos, removeTodo } from "./functions/todos_storage.js";
const fastify = Fastify({ logger: false });
fastify.get("/todos", async (request, reply) => {
  reply.send(await findTodos());
});
fastify.delete("/todos", async (request, reply) => {
  await removeTodo(parseInt(request.query.id));
  console.log(request.query);
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
