// list users
require('./connect')().then(function (mongoose) {

    let db = mongoose.connection;

}).catch (function (e) {

    console.log('ahh man.');
    console.log(e.message);

});
