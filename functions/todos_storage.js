/** Dans ce fichier on aura toutes les fonctions qui vont permettre d'agir sur le système de stockage */
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";
import NotFoundError from "./NotFoundError.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const todosFile = path.join(path.dirname(__dirname), "/storage/todos.json");
/**
 * @typedef {object} Todo Une tache
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @description Va retourner un tableau de liste de tache
 * @author NdekoCode
 * @return {Promise<Todo[]>}
 * @export
 */
export async function findTodos() {
  return JSON.parse(await readFile(todosFile, { encoding: "utf8" }));
}
/**
 * @description Enregistre une tache et nous renvois la tache avec son identifiant et toutes les informations et cela sous forme de Promise
 * @author NdekoCode
 * @export
 * @param {Object} todo
 * @param {string} [todo.title] Le titre de la tache
 * @param {boolean} [todo.completed] Si la tache est completer ou non
 * @return {Promise<Todo>|boolean}
 */
export async function createTodo({ title, completed = false }) {
  // On va recuperer la liste complete des taches pour avoir notre JSON complet et y ajouter notre nouvelle tache
  const todo = { title, completed, id: Date.now() };
  const Mytodos = await findTodos();
  const searchTodos = Mytodos.find((t) => t.title === title);
  console.log(searchTodos);
  if (searchTodos) {
    return false;
  }
  const todos = [todo, ...Mytodos];
  await writeFile(todosFile, JSON.stringify(todos, null, 2));
  return todo;
}
/**
 * @description Supprime une tache dans la BD
 * @author NdekoCode
 * @export
 * @param {number} id
 */
export async function removeTodo(id) {
  const todos = await findTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex === -1) {
    throw new NotFoundError();
  }
  return writeFile(
    todosFile,
    JSON.stringify(
      todos.filter((todo) => todo.id !== id),
      null,
      2
    )
  );
}

/**
 * @description Permet de modifier une tache
 * @author NdekoCode
 * @export
 * @param {number} id L'identifiant de la tache à supprimer
 * @param {{ completed?:boolean,title?:string }} partialTodo L'objet qui contient les nouvelles modification
 */
export async function updateTodo(id, partialTodo) {
  const todos = await findTodos();
  const todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  if (todo === undefined) {
    throw new NotFoundError();
  }
  Object.assign(todo, partialTodo);
  return writeFile(todosFile, JSON.stringify(todos, null, 2));
}
