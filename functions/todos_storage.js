/** Dans ce fichier on aura toutes les fonctions qui vont permettre d'agir sur le système de stockage */
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "node:fs/promises";
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
  const data = await readFile(todosFile, { encoding: "utf8" });
  return JSON.parse(data);
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
  const todos = [todo, ...(await findTodos())];
  await writeFile(todosFile, JSON.stringify(todos));
  return todo;
}
