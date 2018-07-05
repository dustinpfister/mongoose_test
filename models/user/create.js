
require('./connect')().then(function (mongoose) {

    let db = mongoose.connection,
    User = require('./user'),

    // create the user
    user = new User({
            name: process.argv[2] || 'foo',
            password: process.argv[3] || '123',
            createDate: new Date(),
            lastOn: new Date()
        });

    // save the day
    user.save(function (e, day) {

        if (e) {

            console.log('create: error');
            db.close();

        } else {

            console.log('create: saved new user');
            console.log(day);
            db.close();

        }

    });

}).catch (function (e) {

    console.log('ahh man.');
    console.log(e.message);

});

/*
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

let create = () => {

// return a promise
return new Promise((resolve, reject) => {

// create the day
let user = new User({
name: process.argv[2] || 'foo',
password: process.argv[3] || '123',
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

};

// once the database is open
db.once('open', function () {

create().then(() => {

console.log('new user created');
db.close();

}).catch ((e) => {

console.log('error');
console.log(e.message);

db.close();

});

});
*/
