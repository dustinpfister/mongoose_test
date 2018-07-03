

// grab mongoose
let mongoose = require('mongoose'),
host = 'localhost',
port = '27017',
dbName = 'mongoose_users';

// make a connection to mongoDB
mongoose.connect('mongodb://' + host + ':' + port + '/' + dbName);

// ref mongoose.connection
let db = mongoose.connection;

// a Box Model
let User = require('./user');

// options for creating Days, getting Days, and Droping the database
let options = {

    // create a new date
    create: () => {

        // return a promise
        return new Promise((resolve, reject) => {

            // default to '1/1/10' for date, and 0 for users
            let name = process.argv[3] || 'foo',
            users = process.argv[4] || 0,

            // create the day
            user = new User({
                    name: process.argv[3] || 'foo',
                    password: process.argv[4] || '123',
                    createDate: new Date(),
                    lastOn: new Date()
                });

            // save the day
            user.save(function (e, day) {

                if (e) {

                    console.log('create: error');
                    reject(e.message);

                } else {

                    console.log('create: saved new user');
                    resolve(day);

                }

            });

        });

    },

    // drop (delete) the database
    drop: () => {

        // return a promise
        return new Promise((resolve, reject) => {

            db.dropDatabase(function (e) {

                if (e) {

                    console.log('drop: error');
                    reject(e.message);

                } else {

                    console.log('drop: databse droped.');
                    resolve('done');

                }

            });

        });

    },

    // get by date, or list all
    getbyname: () => {

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

                    console.log('getbyname: error');
                    reject(e.message)

                } else {

                    console.log('getbyname: listing');
                    resolve(users);

                }

            });

        });

    }

};

// on error
db.on('error', (e) => {

    console.log('error');
    console.log(e);

});

// once the database is open
db.once('open', function () {

    // default to getbydate
    let opt = process.argv[2] || 'getbyname';

    // if we have that option...
    if (opt in options) {

        // ... then call it
        options[opt]().then((res) => {

            // log any response
            console.log(res);

            // close the connection
            db.close();

        }).catch ((e) => {
            // if an error happens

            // log error message
            console.log(e);

            // close the connection
            db.close();

        });

    } else {

        // else log that the option is not known
        console.log('unknown option: ' + opt);

        // close the connection
        db.close();
    }

});
