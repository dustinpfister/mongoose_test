let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_basic');

let db = mongoose.connection;

db.on('error', (e) => {

    console.log('error');
    console.log(e);

});

// a Box Model
let Day = mongoose.model('Day', {
        date: String,
        users: Number
    });

let options = {

    create: () => {

        return new Promise((resolve, reject) => {

            let date = process.argv[3] || '1/1/10',
            users = process.argv[4] || 0,

            day = new Day({
                    date: date,
                    users: users
                });

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

    get: () => {},

    drop: () => {

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

    list: () => {

        return new Promise((resolve, reject) => {

            Day.find({}, (e, days) => {

                if (e) {

                    console.log('list: error');
                    reject(e.message)

                } else {

                    console.log('list: listing days:');
                    resolve(days);

                }

            });

        });

    }

};

db.once('open', function () {

    let opt = process.argv[2] || 'list';

    if (opt in options) {

        options[opt]().then((res) => {

            console.log(res);

            // close the connection
            db.close();

        }).catch ((e) => {

            console.log(e);

            // close the connection
            db.close();

        });

    } else {

        console.log('unknown option: ' + opt);

        // close the connection
        db.close();
    }

});
