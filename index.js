const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const courseRouter = require('./routers/courseRouter');
const studentRouter = require("./routers/studentRouter");
const learncourseRouter = require("./routers/learncourseRouter");
const attendanceRouter = require("./routers/attendanceRouter");
const feesRouter = require("./routers/feesRouter");
const adminRoute = require('./routers/adminRouter');
const loginStudentRouter = require('./routers/loginStudentRouter');
const adminStudentRouter = require('./routers/adminStudentRouter');
const {validateToken,isAuthorized} = require("./middleware/validateToken");
const cors = require('cors');

const { ensureCounterDocumentExists } = require('./models/StudentCounter'); 

const app = express();
app.use(bodyparser.json());
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;
const DBURL = process.env.MONGO_URL;


mongoose.connect(DBURL).then(()=>{
    console.log("DB Connected Successfully");
    app.listen(PORT, ()=>{
        console.log("Server is running on port :"+ PORT);
    })
})
.catch(error => console.log(error));

// Ensure the counter document exists when the app starts (Student Counter)
ensureCounterDocumentExists()
  .then(counter => {
    console.log('Counter initialized:', counter);
  })
  .catch(err => {
    console.error('Error initializing counter:', err);
  });

app.use('/api/',adminRoute); // public router top'la tha podanum.
app.use('/api/',adminStudentRouter);

app.use('/api/',validateToken, isAuthorized('admin'),courseRouter);
app.use("/api/",validateToken, isAuthorized('admin'),studentRouter);
app.use("/api/",validateToken, isAuthorized('admin'),learncourseRouter);
app.use("/api/",validateToken, isAuthorized('admin'),attendanceRouter);
app.use("/api/",validateToken, isAuthorized('admin'),feesRouter);

app.use('/api/',validateToken, isAuthorized('student'),loginStudentRouter);
