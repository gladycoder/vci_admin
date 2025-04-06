const Attendance = require('../models/attendance');
const Student = require('../models/student');
const LearnCourse = require("../models/learnCourse");
const createAttendance = async(req,res) =>{
    try{
        const AttendanceData = new Attendance(req.body);
    const savedAttendanceData = await AttendanceData.save();

    const learnerID = await LearnCourse.findById(req.body.lid);
    console.log(req.body);
    console.log(learnerID);
    
    
    if(!learnerID){
        return res.status(404).json({error:"Student not found"});
    }
    let newAttendanceID = savedAttendanceData._id;

    learnerID.attendance.push(newAttendanceID);
    let saveLearnerData = await learnerID.save();
    res.status(200).json(savedAttendanceData);
    }
    catch(err){
        console.log(err.message);  
    }
}

const getAllAttendance = async(req,res) =>{
    try {
        const allAttendanceData = await Attendance.find({})
            .populate('sid')  // Populate the studentId field
            .populate('cid')   // Populate the courseId field
            .populate('lid')
            const results = [];
        // Process the populated data
        allAttendanceData.forEach(data => {
            // Construct the result object with the desired fields
            const result = {
                _id: data._id,
                lid:data?.lid?._id,
                sid: data.sid._id,  // Access student's ID from populated data
                cid: data.cid._id,    // Access course's ID from populated data
                sname: data.sid.sname,  // Access student's name
                courseName: data.cid.courseName,  // Access course's name
                attendanceDate: data.attendanceDate,  // Access the join date
                attendanceStatus:data.attendanceStatus,
                inTime : data.inTime,
                outTime : data.outTime,
                topicName : data.topicName
            };
            results.push(result);
            console.log('Formatted Output:', result);
        });
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

const getSingleAttendance = async(req,res) =>{
    try {
        const attendanceID = req.params.id;
        // Find the course document by its ID
        const attendance = await Attendance.findById(attendanceID);
    console.log(attendanceID);
    
        if (!attendance) {
          console.error("Attendance not found");
          return res.status(404).json({ error: "Attendance not found" });
        }
        res.status(200).json(attendance);
      } catch (e) {
        console.log(e.message);
      }
}

const updateAttendance = async(req,res) =>{
    try {
        const id = req.body._id;
        // Add the updatedAt field with the current date to req.body
    req.body.updatedAt = Date.now();
    
        const attendanceUpdateData = await Attendance.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        res.status(201).json(attendanceUpdateData);
      } catch (error) {
        res.status(500).json({ error: "internal server error" });
      }
}

module.exports = {
    createAttendance,
    getAllAttendance,
    getSingleAttendance,
    updateAttendance
}