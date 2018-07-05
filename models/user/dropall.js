// list users
require('./connect')().then(function (mongoose) {

    let db = mongoose.connection;

    db.dropDatabase(function (e) {

        if (e) {

            console.log('drop: error');

        } else {

            console.log('drop: database droped!');

        }

        db.close();

    });

}).catch (function (e) {

    console.log('ahh man.');
    console.log(e.message);

});
