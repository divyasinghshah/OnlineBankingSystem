const mongoose=require('mongoose');

const customerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        default:"India",
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    accNo:{
        type:String,
        required: true,
        default: mongoose.Types.ObjectId
    },
    currentBal:{
        type:Number,
        required:true,
        default:0,
        min:0
    },
    imgUrl:{
        type:String,
        required:true,
        default:""

    },
    transactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Transaction'
        }
    ]

});

const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;