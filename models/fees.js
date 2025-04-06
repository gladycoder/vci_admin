const mongoose = require('mongoose');

const feesSchema = new mongoose.Schema({
    sid:{
        type:mongoose.Schema.ObjectId,
        ref:"Student"
    },
    lid:{
            type:mongoose.Schema.ObjectId,
            ref:"LearnCourse"
        },
    cid:{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    },
    discountAmount:{
        type:Number
    },
    paidAmount:{
        type:Number
    },
    balanceAmount:{
        type:Number
    },
    totalFees:{
        type:Number
    },
    feesPaidDate:{
        type:String
    },
    feesStatus:{
        type:String
    },
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

const feesModel = mongoose.model('Fees',feesSchema);
module.exports = feesModel;