const { Model } = require('objection');


class Users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'age', 'fullname', 'username'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', format: 'email' },
        password: {
          type: 'string',
        },
        age: { type: 'integer', minimum: 0 },
        fullname: { type: 'string' },
        username: { type: 'string' }
      }
    };
  }



  static get relationMappings() {
    const Todo = require('./todos');
    return {
      todo: {
        relation: Model.HasOneRelation,
        modelClass: Todo,
        join: {
          from: 'users.id',
          to: 'todos.user_id',
        },
      },
    };
  }
}

module.exports = Users;
