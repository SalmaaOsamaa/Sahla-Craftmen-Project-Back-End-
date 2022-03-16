const mongoose = require('mongoose');

myTaskSchema = new mongoose.Schema({
    task: {
        type: mongoose.Types.ObjectId,
        ref: 'task'
    },
    email: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    //1:pending for confirmation 2:cancelled 3:done
    taskStatus: {
        type: mongoose.Types.ObjectId,
        ref: 'taskrequest',
        required: true
    }

})
const MyTask = mongoose.model('mytask', myTaskSchema);
module.exports = MyTask;