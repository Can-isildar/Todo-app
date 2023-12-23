const { Model } = require('objection');
const { UnauthorizedError } = require('../utils/custom-erors');


class TodoItems extends Model {
	static get tableName() {
		return 'todo_items';
	}

	static get jsonSchema() {
		return {
			type: 'object',
			required: ['description', 'completed'],

			properties: {
				id: { type: 'integer' },
				description: { type: 'string' },
				completed: { type: 'boolean' }
			}
		}
	}

	static get relationMappings() {
		const Todo = require('./todos')
		return {
			todo: {
				relation: Model.HasOneRelation,
				modelClass: Todo,
				join: {
					from: 'todo_items.todo_id',
					to: 'todos.id'
				}
			},
		}
	}

	checkAuth(userId, todo_id) {
		// console.log({
		// 	userId,
		// 	todo_id
		// })
		// console.log(this.todo.user_id);

		if (this.todo.user_id !== userId) {

			throw new UnauthorizedError();

		}

	}



}
module.exports = TodoItems;