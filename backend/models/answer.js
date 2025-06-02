const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    answerId:{
        type:"string",
        required:true
    },
    selectedChoice:{
        type:"string",
        required:true
    },
    result:{
        type:"string",
        required:true
    }
})


//Database'de Unit adinda collection olustur ve bu collectioni olusturken ...... semasini kullan. 
module.exports = mongoose.model('Answer',answerSchema)