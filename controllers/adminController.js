const adminModel = require('../models/admin');
const validateToken = require("../middleware/validateToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');

dotenv.config();

const createAdmin = async(req,res) =>{
    console.log(req.body);
try{
  const {  email, password } = req.body;
  if ( !email || !password ) {
    res.status(400);
    throw new Error("Email & Password are mandatory!");
  }
    

    const userAvailable = await adminModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  var newAdmin = {
    email:req.body.email,
    password:hashedPassword,
    isLogin:false,
    role:"admin"
}

    const adminData = new adminModel(newAdmin);
    const savedAdminData = await adminData.save();
    res.status(200).json(savedAdminData);
}
catch(e){
console.log(e.message);
}
}

const getAdmin = async (req,res)=>{
try{
const admin = await adminModel.find({});
res.status(200).json(admin);
}
catch(e){
console.log(e.message);
}
}

const loginAdmin = async (req, res) => {
  try{
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const admin = await adminModel.findOne({ email });
    console.log(admin);

    //compare password with hashedpassword
  if (admin && (bcrypt.compare(password, admin.password))) {

    admin.isLogin = true;
    await admin.save();

    // console.log(student);
    const accessToken = jwt.sign(
      {
        _id:admin._id,
        isLogin : admin.isLogin,
        role:admin.role
      },
      process.env.ACCESS_STUDENT_TOKEN_SECERT,
      { expiresIn: "1y" }
    );
// Update isLogin field to true


    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }


  }
  catch(e){
    console.log(e.message);
  }
    
  }
  

  // Route for admin logout
const logoutAdmin =  async (req, res) => {
  const { _id } = req.body;

    try {
        // Find the admin by ID
        const admin = await adminModel.findById(_id);

        // If admin not found, send error response
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update isLogin field to false
        admin.isLogin = false;
        await admin.save();
        console.log(admin);
        // Send success response
        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




module.exports = {createAdmin,getAdmin,loginAdmin,logoutAdmin}