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

exports.postTodo = (req, res, next) => {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        const error = new Error('Validation failed, provided data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const todo = new Todo({
        name: req.body.name,
        status: req.body.status
    });

    todo.save()
        .then(todo => {
            res.status(201).json({
                message: 'Todo successfully created!',
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

exports.putTodo = (req, res, next) => {

    const errors = validationResult(req);

    if(! errors.isEmpty()) {
        const error = new Error('Validation failed, provided data is incorrect.');
        error.statusCode = 422;
        next(error);
    }

    const tid = req.params.tid;

    Todo.findById(tid)
        .then(todo => {

            if(! todo) {
                const error = new Error('Could not find todo.');
                error.statusCode = 404;
                next(error);
            }

            todo.status = req.body.status;

            return todo.save();

        })
        .then(todo => {
            res.status(200).json({ 
                message: 'Todo updated!', 
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

exports.deleteTodo = (req, res, next) => {

    const tid = req.params.tid;
    Todo.findById(tid)
    .then(todo => {

        if(! todo) {
            const error = new Error('Could not find todo.');
            error.statusCode = 404;
            next(error);
        }

        return Todo.findByIdAndRemove(tid);
    })
    .then(result => {
        res.status(200).json({ message: 'Todo deleted.' });
    })
    .catch(err => {
        if(! err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    });
};