const mongoose = require('mongoose')


const questionScheme = new mongoose.Schema({
    questionId:{
        type: 'string',
        required: true
    },
    questionUnit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    questionLevel:{ 
        type: 'string',
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
        required: true
    },
    questionText:{
        type: 'string',
        required: true
    },
    choiceOne:{
        type: 'string',
        required: true
    },
    choiceTwo:{
        type: 'string',
        required: true
    },
    choiceThree:{
        type: 'string',
        required: true
    },
    choiceFour:{
        type: 'string',
        required: true
    },
    rightAnswer:{
        type: 'string',
        required: true
    }
})


module.exports = mongoose.model("Question",questionScheme)