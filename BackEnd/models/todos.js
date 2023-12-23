const { Model } = require('objection');




class Todos extends Model {
  static get tableName() {
    return 'todos';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['names'],

      properties: {
        id: { type: 'integer' },
        names: { type: 'string' },
        user_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const TodoItem = require('./todoItems')
    return {
      todoItems: {
        relation: Model.HasManyRelation,
        modelClass: TodoItem,
        join: {
          from: 'todos.id',
          to: 'todo_items.todo_id'
        }
      },
    }
  }

  checkAuth(userId) {
    const { UnauthorizedError } = require('../utils/custom-erors');

    if (this.user_id !== userId) {
      throw new UnauthorizedError();
    }


  }

}
module.exports = Todos;
