const mongoose = require('mongoose');
const {StudentCounter} = require('./StudentCounter'); // Import the counter model

const studentSchema = mongoose.Schema({
studentID:{
        type: String,
        unique: true, // Ensure courseId is unique
        required: true,       
},
sname:{
    type:String,
},
fatherName:{
    type:String
},
motherName:{
    type:String
},
fatheroccupation:{
    type:String
},
address:{
    type:String,
},
city:{
    type:String
},
mobileNo:{
    type:String
},
fatherMobileNo:{
    type:String
},
gender:{
    type:String
},
dob:{
    type:String
},
email:{
    type:String
},
courseType:{
    type:String
},
image:{
    type:String
},
education:{
    type:String
},
schoolName:{
    type:String
},
advertisment:{
    type:String
},
advertismentLocation:{
    type:String
},
advertismentShopName:{
    type:String
},
role:{
    type:String,
    default:"student"
},
collegeName:{
    type:String
},
isLogin:{
    type:Boolean,
    default:false
},
joinCourses:[
    {
        type:mongoose.Schema.ObjectId,
        ref: 'LearnCourse'
    }
],
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

// Pre-validate middleware to generate custom student ID
studentSchema.pre('validate', async function (next) {
    if (this.isNew) {
      try {
        const counter = await StudentCounter.findOneAndUpdate(
          { _id: 'studentID' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true,maxTimeMS:30000  }
        );
        console.log(counter);
        
        this.studentID = `VCI-${counter.seq}`;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  });
  
  const studentModel = mongoose.model('Student', studentSchema);
  module.exports = studentModel;