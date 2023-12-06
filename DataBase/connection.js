const mongoose = require('mongoose');

let connectToMongoDb = (url)=>{
    return mongoose.connect(url)
}

module.exports=connectToMongoDb