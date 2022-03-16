const mongoose = require('mongoose');


const taskCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String
    }
})

const TaskCategory = mongoose.model('category', taskCategory);
module.exports = TaskCategory;