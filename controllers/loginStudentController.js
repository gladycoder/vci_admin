const LearnCourse = require('../models/learnCourse');
const Student = require('../models/student');
const Course = require('../models/course');

const getSingleStudentDetails = async(req,res)=>{
  try{
const sid = req.params.id;
console.log(sid);

let studentID = sid;
    const student = await Student.findOne({studentID}).populate({
      path: 'joinCourses',
      populate: {
        path: 'courseId', // This will populate the `courseId` field in each `LearnCourse`
        model: 'Course' // The model to populate, which is `Course` in this case
      }
    });
    console.log(student);
    res.status(200).json(student);
  }
  catch(e){
    console.log(e.message);
  }
}

const getSingleStudentLearnCourse = async(req,res)=>{
    try {
        const learncourseId = req.params.id;
        // Find the course document by its ID
        const learncourse = await LearnCourse.findById(learncourseId)
        .populate('courseId','courseName')
        .populate('fees', 'paidAmount balanceAmount totalFees feesPaidDate feesStatus')  // Populate the studentId field
        .populate('attendance','attendanceStatus attendanceDate topicName inTime outTime')   // Populate the courseId field;
    console.log(learncourseId);
    
        if (!learncourse) {
          console.error("Learn Course not found");
          return res.status(404).json({ error: "Learn Course not found" });
        }
        res.status(200).json(learncourse);
      } catch (e) {
        console.log(e.message);
      }
}

const getStudentSingleCourse = async(req,res)=>{
    try {
        const courseId = req.params.id;
        // Find the course document by its ID
        const course = await Course.findById(courseId);
    console.log(courseId);
    
        if (!course) {
          console.error("Course not found");
          return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
      } catch (e) {
        console.log(e.message);
      }
}

// Route for admin logout
const logoutStudent = async (req, res) => {
  const { _id } = req.body;

  try {
    console.log(req.body);
    // Find the admin by ID
    const student = await Student.findById(_id);

    // If student not found, send error response
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    // Update isLogin field to false
    student.isLogin = false;
    await student.save();
    console.log(student);
    // Send success response
    res.status(200).json({ message: "student logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
    getSingleStudentLearnCourse,
    getSingleStudentDetails,
    logoutStudent,
    getStudentSingleCourse
}