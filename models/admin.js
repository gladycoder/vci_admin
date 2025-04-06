const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    email:{
        type: String,
    },
    password:{
        type:String,
        
    },
    role:{
        type:String
    },
    isLogin:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default :()=>Date.now(),
        immutable:true // Cannot be changed once set
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
    }
});



const adminModel = mongoose.model('Admin',adminSchema);
module.exports = adminModel;