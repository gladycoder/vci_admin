const mongoose = require('mongoose');
const learncourseSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    },
    courseJoin:{
        type:String
    },
    courseStatus:{
        type:String
    },
    certificate:{
        type:String
    },
    coursePlacementStatus:{
        type:String
    },
    fees:[
        {
            type:mongoose.Schema.ObjectId,
            ref: 'Fees'
        }
    ],
    attendance:[{
        type:mongoose.Schema.ObjectId,
            ref: 'Attendance'
    }],
    createdAt:{
        type:Date,
        default :()=>Date.now(),
        immutable:true // Cannot be changed once set
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now(),
    }
})
const learncourseModel = mongoose.model('LearnCourse',learncourseSchema);
module.exports = learncourseModel;