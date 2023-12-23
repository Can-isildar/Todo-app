const express = require('express');
const router = express.Router();
const todoService = require('../service/todosService');
const authMiddleware = require('../middilewares/authMiddleware.js');
const auth = require('../middilewares/authMiddleware')
const validate = require('../validator/validator');

// user_id gore todo ekleme 
router.post('/', authMiddleware.authenticateToken, validate.validateTodoBody, async (req, res) => {
    const jsonData = req.body;
    const userId = auth.getUserId();
    jsonData.user_id = userId;

    const todo = await todoService.addTodos({ jsonData, throwNotFound: true })
    console.log(todo);
    res.status(200).json({ id: todo.id, message: 'veri başarıyla eklendi' })


});

// tum todolar
router.get('/', authMiddleware.authenticateToken, async (req, res) => {
    const userId = auth.getUserId();
    const todo = await todoService.getAllTodos({ userId, throwNotFound: true });
    res.status(200).json(todo)


});

// id gore todo cagırma by id 

router.get('/:id', authMiddleware.authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userId = auth.getUserId();
    const todo = await todoService.getTodoById({ id, userId, throwNotFound: true });

    res.status(200).json(todo)


});

// todo silme 

router.delete('/:id', authMiddleware.authenticateToken, async (req, res, next) => {
    const { id } = req.params;
    const userId = auth.getUserId();
    await todoService.deleteTodo({ id, userId })
    res.status(202).json({ message: 'veri başarıyla silindi' })

});

// todo guncelleme

router.put('/:id', auth.authenticateToken, validate.validateTodoBody, async (req, res) => {
    const { id } = req.params
    const userId = auth.getUserId();
    const jsonData = req.body;
    await todoService.updateTodo({ id, userId, jsonData })
    res.status(200).json({id :id ,message: 'veri başarıyla güncellendi' })

});








module.exports = router;