const Fees = require("../models/fees");
const Student = require("../models/student");
const Course = require("../models/course");
const LearnCourse = require("../models/learnCourse");

const createFees = async (req, res) => {
  try {
    const learnerID = await LearnCourse.findById(req.body.lid);

    if (!learnerID) {
      return res.status(404).json({ error: "Learner not found" });
    }

    const studentFeesData = await Fees.find({})
      .populate("sid")
      .populate("cid")
      .populate('lid'); 

      const fees = await Fees.find()
      .populate({
        path: 'lid', // The field in Fees model that refers to LearnCourse
        model: 'LearnCourse', // The model to populate
        populate: { 
          path: 'fees', // Optionally populate fees inside LearnCourse
          model: 'Fees'
        }
      })

      const learnCourse = await LearnCourse.findById(req.body.lid)
      .populate('fees')  // Populate the fees field
      

    if (!learnCourse) {
      return res.status(404).json({ message: 'LearnCourse not found' });
    }

    let newFeesData;
    let fstatus;
    const courseID = await Course.findById(req.body.cid);
    let discountamount = req.body.discountAmount ? req.body.discountAmount : learnCourse.fees[0].discountAmount;

    const courseTotalAmount =
      Number(courseID.coursePrice) - discountamount;

    const feesBalanceAmount = courseTotalAmount - req.body.paidAmount;

    if (learnCourse.fees.length > 0) {
      // This block will now be executed if learnCourse is not an empty array
      console.log("if block executed because learnCourse is not empty.");

      let balanceAmount = 0;
      let result = 0; // Initialize result to 0

      // Sum the paidAmount values from previous learnCourse records
      learnCourse.fees.forEach((data) => {
        result += data.paidAmount; // Accumulate paid amount
        if(data.balanceAmount === 0){
          fstatus = true;
        }
      });

      balanceAmount = courseTotalAmount - result - req.body.paidAmount; // Calculate balance amount

      console.log("balanceAmount :", balanceAmount);

      newFeesData = {
        sid: req.body.sid,
        cid: req.body.cid,
        lid:req.body.lid,
        discountAmount: learnCourse.fees[0].discountAmount,
        paidAmount: req.body.paidAmount,
        balanceAmount: balanceAmount, // Use the calculated balanceAmount
        totalFees: courseTotalAmount,
        feesPaidDate: req.body.feesPaidDate,
        feesStatus: balanceAmount == 0 ? "Full Paid" : "Pending", // Use balanceAmount directly
      };
    } else {
      // studentFeesData is empty, proceed with the else block
      newFeesData = {
        sid: req.body.sid,
        cid: req.body.cid,
        lid:req.body.lid,
        discountAmount: req.body.discountAmount,
        paidAmount: req.body.paidAmount,
        balanceAmount: feesBalanceAmount,
        totalFees: courseTotalAmount,
        feesPaidDate: req.body.feesPaidDate,
        feesStatus: feesBalanceAmount == 0 ? "Full Paid" : "Pending", // Use correct balanceAmount here
      };
    }

if(fstatus){
  return res.status(404).json({ error: "fees full paid" });
}
const FeesData = new Fees(newFeesData);
const savedFeesData = await FeesData.save();

let newFeesId = savedFeesData._id;
learnerID.fees.push(newFeesId);

let saveStudentData = await learnerID.save();
    res.status(200).json(savedFeesData);

  } catch (err) {
    console.log(err.message);
  }
};


const getAllFees = async (req, res) => {
     try {
            const allFeesData = await Fees.find({})
                .populate('sid')  // Populate the studentId field
                .populate('cid')   // Populate the courseId field
                .populate('lid')


                const fees = await Fees.find()
      .populate({
        path: 'lid', // The field in Fees model that refers to LearnCourse
        model: 'LearnCourse', // The model to populate
        populate: { 
          path: 'fees', // Optionally populate fees inside LearnCourse
          model: 'Fees'
        }
      })

                const results = [];
            // Process the populated data
            allFeesData.forEach(data => {
                // Construct the result object with the desired fields
                const result = {
                    _id: data._id,
                    lid:data?.lid?._id,
                    sid: data.sid._id,  // Access student's ID from populated data
                    cid: data.cid._id,    // Access course's ID from populated data
                    sname: data.sid.sname,  // Access student's name
                    courseName: data.cid.courseName,  // Access course's name
                    discountAmount: data.discountAmount,
        paidAmount: data.paidAmount,
        balanceAmount: data.balanceAmount,
        totalFees: data.totalFees,
        feesPaidDate: data.feesPaidDate,
        feesStatus:data.feesStatus,
                };
                results.push(result);
                console.log('Formatted Output:', allFeesData);
            });
            res.status(200).json(results);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
};

const getSingleFees = async (req, res) => {
    try {
        const feesId = req.params.id;
        // Find the course document by its ID
        const fees = await Fees.findById(feesId);
    console.log(feesId);
    
        if (!fees) {
          console.error("Fees not found");
          return res.status(404).json({ error: "Fees not found" });
        }
        res.status(200).json(fees);
      } catch (e) {
        console.log(e.message);
      }
};

const updateFees = async (req, res) => {
    try {
            const id = req.params.id;
            // Add the updatedAt field with the current date to req.body
        req.body.updatedAt = Date.now();

        const studentID = await Student.findById(req.body.sid);

        if (!studentID) {
          return res.status(404).json({ error: "Student not found" });
        }
    
        const studentFeesData = await Fees.find({})
          .populate("sid")
          .populate("cid")
          .populate("lid"); 

          const fees = await Fees.find()
      .populate({
        path: 'lid', // The field in Fees model that refers to LearnCourse
        model: 'LearnCourse', // The model to populate
        populate: { 
          path: 'fees', // Optionally populate fees inside LearnCourse
          model: 'Fees'
        }
      })

      const learnCourse = await LearnCourse.findById(req.body.lid)
      .populate('fees')  // Populate the fees field
      

    if (!learnCourse) {
      return res.status(404).json({ message: 'LearnCourse not found' });
    }

          let newFeesData;
    const courseID = await Course.findById(req.body.cid);
    let discountamount = req.body.discountAmount ? req.body.discountAmount : learnCourse.fees[0].discountAmount;

    const courseTotalAmount =
      Number(courseID.coursePrice) - discountamount;

          if (learnCourse.fees.length > 0) {
            // This block will now be executed if fees is not an empty array
            console.log("if block executed because fees is not empty.");
      
            let balanceAmount = 0;
            let result = 0; // Initialize result to 0
      
            // Sum the paidAmount values from previous fees records
            learnCourse.fees.forEach((data) => {
                if(data._id != id){

                    result += data.paidAmount; // Accumulate paid amount
                }
            });
      
            balanceAmount = courseTotalAmount - result - req.body.paidAmount; // Calculate balance amount
      
            console.log("balanceAmount :", balanceAmount);
      
            newFeesData = {
              sid: req.body.sid,
              cid: req.body.cid,
              lid:req.body.lid,
              discountAmount: learnCourse.fees[0].discountAmount,
              paidAmount: req.body.paidAmount,
              balanceAmount: balanceAmount, // Use the calculated balanceAmount
              totalFees: courseTotalAmount,
              feesPaidDate: req.body.feesPaidDate,
              updatedAt : Date.now(),
              feesStatus: balanceAmount == 0 ? "Full Paid" : "Pending", // Use balanceAmount directly
            };
          }
        
            const feesUpdateData = await Fees.findByIdAndUpdate(id, newFeesData, {
              new: true,
            });
            res.status(201).json(feesUpdateData);
          } catch (error) {
            res.status(500).json({ error: "internal server error" });
          }
};

module.exports = {
  createFees,
  getAllFees,
  getSingleFees,
  updateFees,
};
