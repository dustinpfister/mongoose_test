// grab mongoose
let mongoose = require('mongoose');

// create a Model
let User = mongoose.model('User', {
        name: String,
        password: String,
        createDate: Date,
        lastOn: Date
    });

// I can add methods to the prototype
User.prototype.say = function () {

    return 'hello I am ' + this.name + ' I was last on at ' + this.lastOn;

};

// export it
module.exports = User;
