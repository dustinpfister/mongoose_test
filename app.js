let express = require('express'),
util = require('util'),
app = express();

require('./db')().then(function (Days) {

    app.get('/', function (req, res) {

        res.json(util.inspect(Days));

    });

    app.get('/days', function (req, res) {

        Days.getDays().then(function (d) {

            res.send(util.inspect(d));

        }).catch (function (e) {

            res.json({
                e: e.message
            });

        });

    });

    app.get('/newday', function (res, res) {

        Days.newDay({
            date: '1/1/1',
            users: 7
        }).then(function () {

            res.json({
                mess: 'new day'
            });

        }).catch (function (e) {

            res.json({
                e: e.message
            });

        });

    });

    app.listen(8080, function () {

        console.log('mongoose_test is up');

    });

}).catch (function () {

    console.log('error connecting to databse.');
    console.log(e.message);

});
