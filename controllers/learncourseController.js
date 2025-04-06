const LearnCourse = require('../models/learnCourse');
const Student = require('../models/student');

const createLearnCourse = async(req,res)=>{
    // console.log(req.body);
    
    try{
        const LearnCourseData = new LearnCourse(req.body);
        const savedLearnCourseData = await LearnCourseData.save();

    const studentID = await Student.findById(req.body.studentId);
    console.log(studentID);
    
    if(!studentID){
        return res.status(404).json({error:"Student not found"});
    }
    console.log(savedLearnCourseData._id);
    
    // Update the student document directly with findOneAndUpdate
    const updatedStudent = await Student.findOneAndUpdate(
        { _id: req.body.studentId },
        { $push: { joinCourses: savedLearnCourseData._id } },
        { new: true }  // Returns the updated document
    );

    if (!updatedStudent) {
        return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(savedLearnCourseData);
    }
    catch(err){
        console.log(err.message);  
    }
}

const getAllLearnCourse = async(req,res)=>{

    try {
        const allLearnerData = await LearnCourse.find({})
            .populate('studentId')  // Populate the studentId field
            .populate('courseId')   // Populate the courseId field
            
            const results = [];
        // Process the populated data
        allLearnerData.forEach(data => {
            // Construct the result object with the desired fields
            const result = {
                _id: data._id,
                studentId: data.studentId._id,  // Access student's ID from populated data
                courseId: data.courseId._id,    // Access course's ID from populated data
                studentname: data.studentId.sname,  // Access student's name
                coursename: data.courseId.courseName,  // Access course's name
                courseJoin: data.courseJoin,  // Access the join date
                courseStatus: data.courseStatus,
                coursePlacementStatus:data.coursePlacementStatus
            };
            results.push(result);
            console.log('Formatted Output:', result);
        });
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
    
    
}

const getSingleLearnCourse = async(req,res)=>{
    try {
        const learncourseId = req.params.id;
        // Find the course document by its ID
        const learncourse = await LearnCourse.findById(learncourseId);
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

const updateLearnCourse = async(req,res) =>{
    try {
        const id = req.params.id;
        // Add the updatedAt field with the current date to req.body
    req.body.updatedAt = Date.now();
    
        const learncourseUpdateData = await LearnCourse.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(201).json(learncourseUpdateData);
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
}

module.exports = {
    createLearnCourse,
    getAllLearnCourse,
    getSingleLearnCourse,
    updateLearnCourse
}