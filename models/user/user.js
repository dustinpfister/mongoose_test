// grab mongoose
let mongoose = require('mongoose');

let User = mongoose.model('User', {
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });

User.prototype.say = function () {

    return 'hello I am ' + this.name + ' I was last on at ' + this.lastOn;

};

module.exports = User;
