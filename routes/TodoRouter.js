const router = require('express').Router();
const Todo = require('../models/TodoModel');

router.get('/todo', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.render('todo', { todos });
    } catch (error) {
        res.status(500).json({message: error});
    }
})

router.post('/todo', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        const savedTodo = newTodo.save();
        res.redirect('/api/todo')
    } catch (error) {
        res.status(500).json({message: error});
    }
})

router.put('/todo/:id', async (req, res) => {
    console.log(req.body)
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/api/todo');
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            res.status(404).json({message: "Post not found"});
        }

        await Todo.findByIdAndDelete(req.params.id);
        res.redirect('/api/todo');
    } catch (error) {
        res.status(500).json({message: error})
    }
})

module.exports = router;