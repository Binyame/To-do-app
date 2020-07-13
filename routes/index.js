const
    debug = require('debug')('todo:routes'),
    todoRouter = require('./todo');


const routers = (app) => {
    debug("initiating routers");

    // create paths
    // http://hostname:port/api/v1/todo
    app.use('/api/v1/todo', todoRouter);
}

module.exports = routers;