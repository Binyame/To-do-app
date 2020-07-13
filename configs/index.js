const
    path = require('path'),
    env = process.env;

module.exports = {
    PORT: env.PORT,
    MONGODB: {
        URL: env.DB_CONNECTION_STRING,
        OPTS: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    PAGINATION_LIMIT: 10
};