const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rate: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
})
const Review = mongoose.model('review', reviewSchema);
module.exports = Review;