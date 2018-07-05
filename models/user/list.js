

require('./connect')().then(function (mongoose) {

    let db = mongoose.connection;

    // the User model
    let User = require('./user');

    let list = () => {

        // return a promise
        return new Promise((resolve, reject) => {

            User.find({}, (e, users) => {

                if (e) {

                    reject(e.message)

                } else {

                    resolve(users);

                }

            });

        });

    };

    list().then(function (users) {

        // list the users
        console.log('********** list users **********');
        if (users.length > 0) {

            users.forEach(function (user) {

                console.log('name: ' + user.name + ' ; laston ' + user.lastOn + ';');

            });

        } else {

            console.log('no users.');

        }
        console.log('********** **********');

        db.close();

    }).catch (function (e) {

        console.log(e.message);
        db.close();

    });

}).catch (function (e) {

    console.log('ahh man.');
    console.log(e.message);

});
