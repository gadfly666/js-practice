const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content: String,
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    }
});

const QuestionModel = mongoose.model('Question', questionSchema);

module.exports = QuestionModel;