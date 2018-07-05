// create a user
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
