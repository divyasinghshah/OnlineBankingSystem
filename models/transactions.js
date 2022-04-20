const mongoose=require('mongoose');

const transactionSchema= new mongoose.Schema({
    transactionType:{
        type:String,
        required:true
    },
    transferredFrom:{
        type:String,
        required:true
    },
    transferredTo:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true,
        default:0
    },
    amount:{
        type:Number,
        required:true,
        default:0
    }
},{
    timestamps:true
});

const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;