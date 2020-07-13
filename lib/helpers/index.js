const
    debug = require('debug')('todo:helpers');


class Helpers {

    static get SUCCESS() { return 200; }
    static get CREATED() { return 201; }
    static get SUCEESS_NO_BODY() { return 204; }

    static get UNPROCESSABLE_ENTRY() { return 422; }

    /**
     * 
     * @param {Object} res Respond object in the middleware
     * @param {Number} status Helper status(Helpers.status) 
     * @param {Object} data Data to send to requester
     */
    static successResponse = (res, status, data) => {
        res.status(status).json(data);
        return;
    }

    static errorResponse = (res, status, error) => {
        // TODO: Error handling
        res.status(status).json(error);
        return;
    }


};

module.exports = Helpers;