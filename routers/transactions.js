const express=require('express');
const router=express.Router();

const customerController=require('../controllers/customer_controller');
router.get('/:id',customerController.showTransactions);



module.exports=router;
