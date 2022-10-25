import { createTodo, findTodos, removeTodo } from "../todos_storage.js";
import { json } from "node:stream/consumers";
/**
 * @typedef {object} Todo Une tache
 * @property {number} id
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * @description Recupère les todos dans la BD et les retournes
 * @author NdekoCode
 * @export
 * @param {incomingMessage} req
 * @param {Response} es
 * @returns {Promise<Todo[]>}
 */
export async function index(req, res) {
  const todos = await findTodos();
  return todos;
}
/**
 * @description Enregister une tache dans la BD
 * @author NdekoCode
 * @export
 * @param {incomingMessage} req
 * @param {Response} es
 * @returns {Promise<Todo>}
 */
export async function postTodo(req, res) {
  const newTodo = await json(req); // On lui envois la requete car c'est la "req" qui contient le todos qu'on vient de poster
  if (newTodo.title) {
    // une fois que l'on a parser notre nouvelle tache on l'envois dans la BD
    const todo = await createTodo(newTodo);
    return todo;
  }
  return {};
}
/**
 * @description Supprime une tache dans la BD
 * @author NdekoCode
 * @export
 * @param {incomingMessage} req
 * @param {Response} res
 * @param {URL} url
 */
export async function deleteTodo(req, res, url) {
  const id = url.searchParams.get("id");
  removeTodo(id);
}
