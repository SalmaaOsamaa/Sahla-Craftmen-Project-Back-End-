const mongoose = require('mongoose');


const taskRequest = new mongoose.Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'task'
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'address',
        required: true
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'user'

    },

    taskOption: {
        enum: ['small', 'medium', 'large'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasker: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true

    },
    Taskappointment: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: Number,
        enum: ['None', 'pending', 'Approved', 'Cancelled']
    }


})
const TaskRequest = mongoose.model('taskrequest', taskRequest);
module.exports = TaskRequest;