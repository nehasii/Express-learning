const {Schema, model}= require('mongoose')

let usersSchema = new Schema({
        fullname:{
            type: String,
            required:[true, "Fullname is mandatory!"]
        },
        email:{
            type:String,
            required:[true, "Email is mandatory!"]
        },
        password:{
            type:String,
            required:[true, "Password is mandatory!"]
        },
        mobile:{
            type: Number,
            required:[true, "Mobile is mandatory!"]
        },
        age:{
            type: Number
        },
        createdBy:{
            type: String,
            required: [true, "createdBy is mandatory"]
        }

    }, {timestamps:true})


    // ! Collection
    module.exports = model('user', usersSchema)