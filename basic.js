// grab mongoose
let mongoose = require('mongoose');

let mongoURL = {

    host: 'localhost',    // assuming localhist will work, change if different
    port: 27017,          // default port change this if different
    db: 'mongoose_basic'  // name of database

};
mongoURL.url = 'mongodb://' + mongoURL.host + ':' + mongoURL.port + '/' + mongoURL.db;

// make a connection to mongoDB
mongoose.connect(mongoURL.url);

// ref mongoose.connection
let db = mongoose.connection;

// a Box Model
let Day = mongoose.model('Day', {
        date: String,
        users: Number
    });

// options for creating Days, getting Days, and Droping the database
let options = {

    // create a new date
    create: () => {

        // return a promise
        return new Promise((resolve, reject) => {

            // default to '1/1/10' for date, and 0 for users
            let date = process.argv[3] || '1/1/10',
            users = process.argv[4] || 0,

            // create the day
            day = new Day({
                    date: date,
                    users: users
                });

            // save the day
            day.save(function (e, day) {

                if (e) {

                    console.log('create: error');
                    reject(e.message);

                } else {

                    console.log('create: saved new day');
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
    getbydate: () => {

        // query defaults to an empty object
        let query = {};

        // set date if given
        if (process.argv[3]) {
            query.date = process.argv[3];
        }

        // return a promise
        return new Promise((resolve, reject) => {

            Day.find(query, (e, days) => {

                if (e) {

                    console.log('getByDate: error');
                    reject(e.message)

                } else {

                    console.log('getByDate: listing days:');
                    resolve(days);

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
    let opt = process.argv[2] || 'getbydate';

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
