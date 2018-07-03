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

// once the database is open
db.once('open', () => {

    // find all users
    User.find({}, (e, users) => {

        if (e) {
            // if error logg message and close
            console.log(e.message);
            db.close();

        } else {

            // else call say for all users
            users.forEach((user) => {

                console.log(user.say());

            });

            db.close();

        }

    })

});
