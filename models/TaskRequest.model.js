const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


const taskRequest = new mongoose.Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'task'
    },
    workarea: {
        type: mongoose.Types.ObjectId,
        ref: 'workarea',
        required: true
    },
    // customer: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'user'

    // },

    taskOption: {
        enum: ['small', 'medium', 'large'],
        required: false
    },
    description: {
        type: String,
        required: true
    },
    tasker: {
        // type: mongoose.Types.ObjectId,
        // ref: 'tasker',
        // required: true
        type:String

    },
    taskappointment: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['None', 'pending', 'approved', 'rejected'],
        default:"pending",
        
    }


})
const TaskRequest = mongoose.model('taskrequest', taskRequest);
module.exports = TaskRequest;