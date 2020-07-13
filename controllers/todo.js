const
    debug = require('debug')('todo:todo-controller'),
    { EventEmitter } = require('events'),
    { validationResult } = require('express-validator');

const
    TodoDAL = require('../dals/todo'),
    Helpers = require('../lib/helpers');

// get all todo
exports.getAll = (req, res, next) => {
    debug("getAll: fetching todos");

    // check for query filter
    let query = req.query || {};

    TodoDAL.getCollection(query, (err, todos) => {
        // TODO: handle error
        Helpers.successResponse(res, Helpers.SUCCESS, todos);
    })

};

// create todo 
exports.create = (req, res, next) => {
    debug("create: writing new todo");

    let workflow = new EventEmitter();

    workflow.on('validateBody', () => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // TODO: Handle errors
            return Helpers.errorResponse(res, Helpers.UNPROCESSABLE_ENTRY, { errors: errors.array() });
        }

        workflow.emit('createTodo');

    });

    workflow.on('createTodo', () => {
        TodoDAL.create(req.body, (err, newTodo) => {
            // TODO: Handle error

            Helpers.successResponse(res, Helpers.CREATED, newTodo);
        });
    });

    workflow.emit('validateBody');


};

// delete todo
exports.delete = (req, res, next) => {
    debug("delete: delete a todo");

    let id = req.params.id;

    TodoDAL.delete(id, (err, deletedTodo) => {
        // TODO: handle errors

        Helpers.successResponse(res, Helpers.SUCEESS_NO_BODY, null);
    });
};

// get all todo with pagination 
exports.getAllInPagination = (req, res, next) => {
    debug("getAllInPagination: fetching todos with paginations");

    // check for query filter
    let query = req.query || {};

    TodoDAL.getCollectionInPagination(query, (err, todos) => {
        // TODO: handle error
        Helpers.successResponse(res, Helpers.SUCCESS, todos);
    })

};