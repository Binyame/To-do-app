const { mongo } = require('mongoose');

const
    debug = require('debug')('todo:todo-dal'),
    mongoose = require('mongoose');

// fetch models
const
    TodoModel = require('../models/todo');
const { NotExtended } = require('http-errors');
const todo = require('../models/todo');
const config = require('../configs')
    /**
     *  fetch all Todos from the database with query filter
     * 
     * @param {Object} query any query to filter the collection
     * @param {Function} callback a callback function that will respond error and streamed todos
     *                  - error {Object} if there is an error from fetching from database
     *                  - todos {Object} Stremable object of todos
     */
exports.getCollection = (query, callback) => {
    debug("getAll: fetching todos");

    // if query param is null set it to an empty object
    if (!query) query = {};

    TodoModel.find(query, (err, todos) => {
        //if(err) return next(Error.); // TODO: handle error here
        callback(null, todos);
    });


};

/**
 * Create new Todo in the database
 * @param {Object} todoData new todo data to be save in database
 * @param {Function} callback a callback function that will respond the result of creating todo operation
 */

exports.create = (todoData, callback) => {
    debug("create: write new todo data to database");

    let todo = new TodoModel(todoData);

    todo.save((err, todoInDb) => {
        callback(err, todoInDb);
    });
}

/**
 * Delete a specific todo in the database
 * @param {String} id Object ID of the todo
 * @param {Function} callback a callback function to handle error and deleted todo
 */
exports.delete = (id, callback) => {
    debug("delete: delete todo data from database for an ID", id);

    TodoModel.deleteOne({ _id: id }, (err, deletedTodo) => {
        // TODO: handle Error here
        callback(null, deletedTodo);
    });
}

/**
 *  fetch all Todos with pagination from the database with query filter
 * 
 * @param {Object} query any query to filter the collection
 * @param {Function} callback a callback function that will respond error and streamed todos
 *                  - error {Object} if there is an error from fetching from database
 *                  - todos {Object} Stremable object of todos
 */
exports.getCollectionInPagination = (query, callback) => {
    debug("getCollectionInPagination: fetching todos with pagination");

    // if query param is null set it to an empty object
    if (!query) query = {};

    TodoModel.paginate(query, { limit: config.PAGINATION_LIMIT }).then((docs) => {
        callback(null, docs);
    }).catch((err) => {
        // TODO: handle Errors
        callback(err);
    });


};