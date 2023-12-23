const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../db/knexfile'); // Knex.js yapılandırma dosyası

// Knex.js bağlantısını oluşturun
const knex = Knex(knexConfig.development);

// Objection.js için bağlantıyı tanıtın
Model.knex(knex);


const { UnauthorizedError, NotFoundError } = require('../utils/custom-erors')
const Todos = require('../models/todos');


async function addTodos({ jsonData }) {
    const todo = await Todos.query().insert(jsonData);
    return todo;
}

async function getTodoById({ id, userId, throwNotFound = true }) {

    const todo = await Todos.query().where('id', id).withGraphFetched('todoItems').first()

    todo.checkAuth(userId)


    if (todo) {
        return todo;
    }
    else if (throwNotFound) {
        throw new NotFoundError();
    }
    else {
        return null;
    }
}

async function deleteTodo({ id, userId }) {
    let todo = await getTodoById({ id, userId })
    return todo = await Todos.query().delete().where('todos.id', id)
}

async function updateTodo({ id, userId, jsonData }) {
    let todo = await getTodoById({ id, userId });
    return todo = await Todos.query().patch(jsonData).where('todos.id', id);


}

async function getAllTodos({ userId }) {

    return await Todos.query().select('todos.*').where('todos.user_id', userId)

}





module.exports = {
    addTodos,
    getTodoById,
    deleteTodo,
    updateTodo,
    getAllTodos
}