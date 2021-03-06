const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
        default:"https://picsum.photos/400",
        unique:false
    },
    whattoexpect: {
        type: String,
        required: true
    },
    avgPrice: {
        type: Number,
        required: true
    },
    taskcat: {
        type: mongoose.Types.ObjectId,
        ref: 'taskcategory',
        required: false
    },
    taskers: {
        type: mongoose.Types.ObjectId,
        ref: 'tasker',
        required: [false, 'Tasker is required']
    }
})
const Task = mongoose.model('task', TaskSchema);
module.exports = Task;