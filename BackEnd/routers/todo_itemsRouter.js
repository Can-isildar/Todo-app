const express = require('express');
const router = express.Router();
const todo_itemsService = require('../service/todoItemsService');
const authMiddleware = require('../middilewares/authMiddleware.js');
const validate = require('../validator/validator');

// todo_items veri ekleme
router.post('/todos/:todo_id/items', authMiddleware.authenticateToken, validate.validateAddItems, async (req, res) => {
  const jsonData = req.body;
  const todo_id = req.params.todo_id;
  jsonData.todo_id = todo_id;
  const userId = authMiddleware.getUserId();
  const todoItem =  await todo_itemsService.addTodoItem({ todo_id, userId, jsonData });
  res.status(200).json({todoItem , message: 'veri başarıyla eklendi' });

});


// todo_items veri cekme by id
router.get('/todos/:todo_id/items/:id', authMiddleware.authenticateToken, async (req, res) => {
  const { id, todo_id } = req.params;
  const userId = authMiddleware.getUserId();
  const result = await todo_itemsService.getTodoItem({ id, todo_id, userId, throwNotFound: true });
  res.status(200).json(result)
});


// todo_items getAll
router.get('/todos/:todo_id/items/', authMiddleware.authenticateToken, async (req, res) => {
  const userId = authMiddleware.getUserId();
  const { todo_id } = req.params
  const result = await todo_itemsService.getAllTodoItem(todo_id);
  res.status(200).json(result);

})

// todo_items veri silme
router.delete('/todos/:todo_id/items/:id', authMiddleware.authenticateToken, async (req, res) => {
  const { id, todo_id } = req.params;
  const userId = authMiddleware.getUserId();
  const result = await todo_itemsService.deleteTodoItem({ id, todo_id, userId });
  res.status(202).json({ message: 'veri başarıyla silindi' });
})

//todo_items güncelleme
router.put('/todos/:todo_id/items/:id', authMiddleware.authenticateToken, validate.validateAddItems, async (req, res) => {
  const jsonData = req.body
  const { id, todo_id } = req.params;
  const userId = authMiddleware.getUserId();
  const result = await todo_itemsService.updateTodoItem({ id, todo_id, userId, jsonData })
  res.status(200).json({ message: 'veri başarıyla güncellendi' })
})







module.exports = router;