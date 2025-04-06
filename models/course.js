const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    coursePrice:{
        type : String,
    },
    courseDuration:{
        type : String
    },
    courseImage:{
        type : String
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



const courseModel = mongoose.model('Course',courseSchema);
module.exports = courseModel;