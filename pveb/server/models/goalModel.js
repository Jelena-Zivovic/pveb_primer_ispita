const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    naziv: {
        type: String
    },
    opis: {
        type: String
    },
    vaznost: {
        type: Number,
        enum: [1, 2, 3]
    }
});

const goalModel = mongoose.model('Goal', goalSchema);

module.exports = goalModel;