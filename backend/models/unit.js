const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    unitId:{
        type:"string",
        required:true
    },
    unitName:{
        type:"string",
        required:true
    },
})


//Database'de Unit adinda collection olustur ve bu collectioni olusturken ...... semasini kullan. 
module.exports = mongoose.model('Unit',unitSchema)