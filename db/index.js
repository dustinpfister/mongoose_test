let mongoose = require('mongoose');

// no operation function
let noop = () => {};

var api = {
    mongoose: require('mongoose'),
    con: null,
    db: null
};

// the day model
api.Day = mongoose.model('Day', {
        date: String,
        users: Number
    });

api.newDay = function (feild) {

    feild = feild || {};

    var now = new Date();
    feild.date = feild.date || (now.getMonth() + 1) + '/' + (now.getDate() + 1) + '/' + now.getDateFullYear();
    feild.users = feild.users || 0;

    var self = this;
    return new Promise(function (resolve, reject) {

        let newDay = new self.Day(feild);

        newDay.save(function (e, day) {

            if (e) {

                reject(e.message);

            } else {

                resolve(day);

            }

        });

    });

};

api.getDays = function () {

    let self = this;
    return new Promise(function (resolve, reject) {

        //resolve(this.db.collections.days.collection);

        self.Day.find({}, function (err, days) {

            resolve(days);

        });

    });

};

// what is returned
module.exports = function (op) {

    // set options defaults
    op = op || {};
    op.url_connect = op.url_connect || 'mongodb://localhost/mongoose_test';

    // connect
    mongoose.connect(op.url_connect);
    let db = api.db = mongoose.connection;

    // on error
    return db.on('error', noop).catch (function (e) {

        console.log(e.message);
        return {};

    })
        .then(function () {

            return db.once('open', noop);

        })
        .then(function (db) {

            this.db = db;

            return api;

        });

};
