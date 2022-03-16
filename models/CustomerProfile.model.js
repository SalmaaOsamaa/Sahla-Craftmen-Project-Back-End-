const mongoose = require('mongoose');


const customerProfileSchema = new mongoose.Schema({
    name: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: 'address',
        required: true
    },
    account: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    tasks: {
        type: [{ type: Schema.Types.ObjectId, ref: 'taskrequest' }],

    }


});
const CustomerProfile = mongoose.model('customerprofile', customerProfileSchema);
module.exports = CustomerProfile;