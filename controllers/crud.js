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

exports.getSingleTodo = (req, res, next) => {

    const tid = req.params.tid;
    Todo.findById(tid)
    .then(todo => {

        if(! todo) {
            const error = new Error('Could not find todo.');
            error.statusCode = 404;
            next(error);
        }

        res.status(200).json({
            message: "successfully fetched todo",
            todo: { name: todo.name, status: todo.status, id: todo._id.toString()}
        });
    })
    .catch(err => {
        if(! err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    });
};
