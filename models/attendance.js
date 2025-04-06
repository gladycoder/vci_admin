const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    lid:{
        type:mongoose.Schema.ObjectId,
        ref:"LearnCourse"
    },
sid:{
    type:mongoose.Schema.ObjectId,
    ref:"Student"
},
cid:{
    type:mongoose.Schema.ObjectId,
    ref:"Course"
},
attendanceDate:{
    type:String
},
inTime:{
    type:String
},
outTime:{
    type:String
},
attendanceStatus:{
type:String
},
topicName:{
    type:String
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

const attendanceModel = mongoose.model('Attendance',attendanceSchema);
module.exports = attendanceModel;