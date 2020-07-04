const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    cilj: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Goal'
    },
    redniBroj: {
        type: Number
    },
    opis: {
        type: String
    }
}); 

const stepModel = mongoose.model('Step', stepSchema);

module.exports = stepModel;