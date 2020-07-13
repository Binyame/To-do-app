const debug = require('debug')('api:errors');


var ERROR_CODES = {
    DATABASE_CONNECTION_ERROR: {
        message: 'Unable to connect to the database',
        status: 500
    },
};

/**
 * CustomError Type Definition.
 *
 * @param {Object} info error information
 *
 */
function CustomError(info) {
    if (!(this instanceof CustomError)) {
        return new CustomError(info);
    }

    var _knownError = ERROR_CODES[info.name];

    this.name = info.name || 'DEFAULT_ERROR';
    this.message = _knownError ? _knownError.message : info.message;
    this.status = _knownError ? _knownError.status : (info.status ? info.status : 400);
}

CustomError.prototype = Object.create(Error.prototype);

CustomError.prototype.constructor = CustomError;

exports.CustomError = CustomError;

/**
 * MongoDB error handler
 *
 * @desc Catches and handles mongodb connection errors
 */
exports.mongoError = () => {
    debug('responding to MongoDB connection error');

    console.error('MongoDB connection error. Please make sure MongoDB is running');

    process.exit(1);
};