const { validationResult } = require('express-validator/check');

const Todo = require('../models/todo');

exports.getAllTodos = (req, res, next) => {

    Todo.find()
        .then(todos => {
            res.status(200).json({
                message: "successfully fetched todos",
                todos: todos.map(todo => {
                    return { name: todo.name, status: todo.status, id: todo._id.toString()};
                })
            });
        })
        .catch(err => {
            if(! err.statusCode) {
                err.statusCode = 500;
                next(err);
            }
        });
};