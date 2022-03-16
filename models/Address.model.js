const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    government: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    }
});
const Address = mongoose.model('address', addressSchema);
module.exports = Address;