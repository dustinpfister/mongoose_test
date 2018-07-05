// grab mongoose
let mongoose = require('mongoose'),
host = 'localhost',
port = '27017',
dbName = 'mongoose_users';

// make a connection to mongoDB
mongoose.connect('mongodb://' + host + ':' + port + '/' + dbName);

// ref mongoose.connection
let db = mongoose.connection;

// the User model
let User = require('./user');

let list = () => {

    // query defaults to an empty object
    let query = {};

    // set date if given
    if (process.argv[3]) {
        query.name = process.argv[3];
    }

    // return a promise
    return new Promise((resolve, reject) => {

        User.find(query, (e, users) => {

            if (e) {

                reject(e.message)

            } else {

                resolve(users);

            }

        });

    });

};

// once the database is open
db.once('open', function () {

    list().then((users) => {

        // list the users
        console.log('********** list users **********');
        users.forEach(function (user) {

            console.log('name: ' + user.name + ' ; laston ' + user.lastOn + ';');

        });
        console.log('********** **********');

        db.close();

    }).catch ((e) => {

        console.log('error');
        console.log(e.message);

        db.close();

    });

});
