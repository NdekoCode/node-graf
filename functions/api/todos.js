import {
  createTodo,
  findTodos,
  removeTodo,
  updateTodo,
} from "../todos_storage.js";
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
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
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
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {Promise<Todo>}
 */
export async function postTodo(req, res) {
  const newTodo = await json(req); // On lui envois la requete car c'est la "req" qui contient le todos qu'on vient de poster
  if (newTodo.title) {
    // une fois que l'on a parser notre nouvelle tache on l'envois dans la BD
    const todo = await createTodo(newTodo);
    console.log(!todo, todo);
    if (!todo) {
      res.writeHead(409, "Tache existe déjà");
      return {};
    }
    res.writeHead(200, "Tache ajouter avec succés");
    return todo;
  }
  res.writeHead(204, "Entrer des informations valides");
  return {};
}
/**
 * @description Supprime une tache dans la BD
 * @author NdekoCode
 * @export
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {URL} url
 */
export async function deleteTodo(req, res, url) {
  const id = parseInt(url.searchParams.get("id"), 10);
  await removeTodo(id);
  // 204: C'est pour dire que notre reponse n'a pas de contenus vus que l'on vient d'effectuer une suppression
  res.writeHead(204, "Tache supprimer avec succés");
}
/**
 * @description Permet de modifier une tache
 * @author NdekoCode
 * @export
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {URL} url
 */
export async function update(req, res, url) {
  const id = parseInt(url.searchParams.get("id"));
  const myTodo = await json(req);
  if (myTodo.title || myTodo.completed) {
    const todo = await updateTodo(id, myTodo);

    res.writeHead(204, "Tache modifié avec succés");
    return todo;
  }
  res.writeHead(204, "Entrer des informations valides");
  return {};
}
