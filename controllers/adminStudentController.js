const Student = require("../models/student");
const LearnCourse = require("../models/learnCourse");
const Course = require("../models/course");
const validateToken = require("../middleware/validateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

const loginStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { sid, sdob } = req.body;
    if (!sid || !sdob) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    let studentID = sid;
    const student = await Student.findOne({ studentID }).populate(
      "joinCourses"
    );
    // console.log(student);
    if (student) {
      if (sid === student.studentID && sdob === student.dob) {
        console.log("correct student ");
        student.isLogin = true;
        await student.save();

        // console.log(student);
        const accessToken = jwt.sign(
          {
            studentID: student.studentID,
            isLogin: student.isLogin,
            role:student.role
          },
          process.env.ACCESS_STUDENT_TOKEN_SECERT,
          { expiresIn: "3y" }
        );
        // Update isLogin field to true

        res.status(200).json({ accessToken });
      } else {
        res.status(401);
        throw new Error("Student Not Found");
      }
    } else {
      res.status(401);
      throw new Error("Student Not Found");
    }
  } catch (e) {
    console.log(e.message);
  }
};



module.exports = { loginStudent };
