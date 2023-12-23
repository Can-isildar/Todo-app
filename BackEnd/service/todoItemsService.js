
const TodoItems = require('../models/todoItems');
const Todos = require('../models/todos')

const { UnauthorizedError, NotFoundError } = require('../utils/custom-erors')



async function addTodoItem({ jsonData, userId, todo_id, throwNotFound = true }) {

    const todos = await Todos.query().select('todos.*').where('todos.user_id', userId).where('todos.id', todo_id);

    if (todos.length > 0) {
        return await TodoItems.query().insert(jsonData);
    } else if (throwNotFound) {
        throw new NotFoundError();
    } else {
        return null;
    }
}

async function getTodoItem({ id, todo_id, userId, throwNotFound = true }) {

    const todoItem = await TodoItems.query()
        .findById(id)
        .withGraphFetched('todo')

        todoItem.checkAuth(userId, todo_id);

        if (todoItem) {

            return todoItem;
        }
        else {
            if (throwNotFound) {
                throw NotFoundError();
            }
            return null;
        }

}

async function deleteTodoItem({ id, todo_id, userId }) {
    let result = await getTodoItem({ id, todo_id, userId }); // getTodoItem sonucunu bekleyin
    return result = await TodoItems.query().delete().where('todo_items.id', id).skipUndefined();

}


async function updateTodoItem({ id, todo_id, userId, jsonData }) {
    let result = await getTodoItem({ id, todo_id, userId }); // getTodoItem sonucunu bekleyin

    return result = await TodoItems.query().patch(jsonData).where('todo_items.id', id).skipUndefined();


}
async function getAllTodoItem(todo_id) {

    return await TodoItems.query().where('todo_id',todo_id).withGraphFetched('todo');


}





module.exports = {
    addTodoItem,
    getTodoItem,
    deleteTodoItem,
    updateTodoItem,
    getAllTodoItem

}