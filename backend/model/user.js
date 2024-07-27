const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    password: {type: String},
    resetToken: {type: String},
});

UserSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', UserSchema);



module.exports = User;