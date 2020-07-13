const
    express = require('express'),
    debug = require('debug')('todo:routes-todo'),
    { body, check, validationResult } = require('express-validator');

const
    todoController = require('../controllers/todo');

// initiate router
let router = express.Router();

/**
 * 
 * @api {GET} /todo Get all TODOs
 * @apiName GetAllTodos
 * @apiGroup Todo
 * @apiVersion  1.0.0
 * @apiPermission Guest
 * @apiDescription fetch all todos from server
 *
 * 
 * @apiSampleRequest /api/v1/todo
 * 
 * @apiSuccess {Object[]} todo List of todos
 * @apiSuccess {String} todo.content todo content text
 * @apiSuccess {Number} todo.order roll number
 * @apiSuccess {Number} todo.priority priority on todos
 * @apiSuccess {Date} todo.date todo date
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 *  {
 *   "isDone": false,
 *   "priority": 2,
 *   "_id": "5ef8cccd7ab201c56571290a",
 *   "content": "Walking in the park",
 *   "date": "2020-06-28T17:01:01.093Z",
 *   "order": 1,
 *   "__v": 0
 *  },
 * ]
 * 
 * 
 */
router.get('/', todoController.getAll);

// TODO: Write documentations
router.post('/', [
    // content must be string, not empty, minimum length is 3, trimmed, escape characters removal,
    body('content')
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .trim()
    .escape(),
], todoController.create);

// TODO: write documentation
router.delete('/:id', todoController.delete);

// TODO: Write documentation
router.get('/paginate', todoController.getAllInPagination);


module.exports = router;