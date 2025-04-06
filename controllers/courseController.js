const Course = require('../models/course');

const createCourse = async(req,res)=>{
    console.log(req.body);
    
    try{
        const courseData = new Course(req.body);
    const savedCourseData = await courseData.save();
    res.status(200).json(savedCourseData);
    }
    catch(err){
        console.log(err.message);  
    }
}


const getAllCourses = async(req,res)=>{
    try{
        const allCourseInfo = await Course.find();
        return res.status(200).json(allCourseInfo);
      }
      catch(error){
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
}

const getSingleCourse = async(req,res)=>{
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

const getUpdateCourse = async(req,res)=>{
    try {
        const id = req.params.id;
        // Add the updatedAt field with the current date to req.body
    req.body.updatedAt = Date.now();
    
        const courseUpdateData = await Course.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(201).json(courseUpdateData);
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
}
module.exports = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    getUpdateCourse
}