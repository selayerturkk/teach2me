const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    startDate:{
        type:Date,
        required:false
    },
    endDate:{
        type:Date,
        required:false
    },
    testUnit:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
    },
    testLevel:{ 
        type: 'string',
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
        required: true
    },
    testStatus:{ 
        type: 'string',
        enum: ['ongoing', 'completed', 'canceled'],
        default: 'ongoing',
        required: true
    },
    testQuestions:{
        type:Array
    },
    user:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

   
})


//Database'de Unit adinda collection olustur ve bu collectioni olusturken ...... semasini kullan. 
module.exports = mongoose.model('Test',testSchema)