// connect to mongodb with mongoose, and then return mongoose
module.exports = function (options, cb) {

    // grab mongoose
    let mongoose = require('mongoose');

    options = options || {};
    options.host = options.host || 'localhost';
    options.port = options.port || 27017;
    options.db = options.db || 'mongoose_users';

    cb = cb || function () {};

    // the mongodb url
    let mongoURL = {
        host: 'localhost', // assuming localhist will work, change if different
        port: 27017, // default port change this if different
        db: 'mongoose_users' // name of database
    };
    mongoURL.url = 'mongodb://' + mongoURL.host + ':' + mongoURL.port + '/' + mongoURL.db;

    // make a connection to mongoDB
    mongoose.connect(mongoURL.url);

    // ref mongoose.connection
    let db = mongoose.connection;

    return new Promise(function (resolve, reject) {

        // on error
        db.on('error', (e) => {

            db.close();
            reject(e.message);

        });

        // once the database is open
        db.once('open', function () {

            // resolve with mongoose
            resolve(mongoose);

        });

    });

};
