const { hash, genSalt } = require('bcryptjs');
const mongoose = require('mongoose');
const {Schema} = require('mongoose')
const Address = require('./Address.model');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name Field is required'],
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password Field is required']
    },
    zip: {
        type: String,

    },
    role: {
        type: String,
        enum: ['admin', 'customer', 'tasker'],
        required: true
    },
    address: {
        type: mongoose.Types.ObjectId,

        ref: 'address',
        required: true
    },
    newNotificationCount: {
        type: Number,
        default: 0
    },
    isAvailable: {
        required: true,
        default: true,
        type: Boolean
    },
    image:{
        type:String,
        default:"https://picsum.photos/400"
    },
    tasks: {
        type: [{ type: Schema.Types.ObjectId, ref: 'taskrequest' }],
        required:false
    }
},
    { timestamps: true });

const User = mongoose.model('user', UserSchema);
module.exports = User;