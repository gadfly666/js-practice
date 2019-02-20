const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    fullName: {type: String},
    facebookAccount: {
        uid: {type: String, unique: true, sparse: true},
        email: {type: String}
    }
}, {
    timestamps: true
});

const UsersModel = mongoose.model('User', userSchema);

module.exports = UsersModel;