// grab mongoose
let mongoose = require('mongoose');

let User = mongoose.model('User', {
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });

module.exports = User;
