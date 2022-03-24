const mongoose = require('mongoose');


const TaskerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,

    },
    task:
        [{ type: mongoose.Types.ObjectId, ref: 'task' }],


    Skills: {
        type: [String],
        required: true
    },
    About: {
        type: String,
        required: true
    },
    workarea: [{
        type: mongoose.Types.ObjectId,
        ref: 'workarea'
    }],
    reviews:
        [{ type: mongoose.Types.ObjectId, ref: 'review' }],
    numberOfReviews: {
        type: Number,
        default: 0
    },
    PricePerHour : {
        type : Number ,
        default: 0
    }
})
const Tasker = mongoose.model('tasker', TaskerSchema);
module.exports = Tasker;