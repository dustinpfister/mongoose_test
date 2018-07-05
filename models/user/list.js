// list users
require('./connect')().then(function (mongoose) {

    let db = mongoose.connection,
    User = require('./user');     // the User model

    User.find({}, (e, users) => {

        // list the users
        console.log('********** list users **********');
        if (e) {

            // if an error happens list the message
            console.log(e.message);

        } else {

            if (users.length > 0) {

                users.forEach(function (user) {

                    console.log('name: ' + user.name + ' ; laston ' + user.lastOn + ';');

                });

            } else {

                console.log('no users.');

            }

        }
        console.log('********** **********');

        db.close();

    });

}).catch (function (e) {

    console.log('ahh man.');
    console.log(e.message);

});
