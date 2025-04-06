const Student = require('../models/student');

const createStudent = async(req,res)=>{
    try{
        const studentData = new Student(req.body);
    const savedStudentData = await studentData.save();
    res.status(201).json(savedStudentData);
    }
    catch(err){
        console.log(err.message);  
    }
}

const allStudents = async(req,res)=>{
    try{
        const allStudentInfo = await Student.find();
        return res.status(200).json(allStudentInfo);
      }
      catch(error){
        res.status(501).json({
          code: 501,
          message: error.message,
          error: true,
        });
      }
}

const singleStudent = async(req,res)=>{
    try {
        const studentId = req.params.id;
        // Find the student document by its ID
        const student = await Student.findById(studentId);
    console.log(studentId);
    
        if (!student) {
          console.error("student not found");
          return res.status(404).json({ error: "student not found" });
        }
        res.status(200).json(student);
      } catch (e) {
        console.log(e.message);
      }
}

const updateStudent = async(req,res)=>{
    try {
        const id = req.params.id;
        // Add the updatedAt field with the current date to req.body
    req.body.updatedAt = Date.now();
    
        const studentUpdateData = await Student.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(201).json(studentUpdateData);
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
}

module.exports = {
    createStudent,
    allStudents,
    singleStudent,
    updateStudent
}