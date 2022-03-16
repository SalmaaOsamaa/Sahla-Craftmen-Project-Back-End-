const mongoose = require('mongoose');

const workareaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: [String],
        required: true
    }
})

const WorkArea = mongoose.model('workarea', workareaSchema);
module.exports = WorkArea;

