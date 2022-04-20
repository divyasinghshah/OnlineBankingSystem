const express=require('express');
const router=express.Router();

const customerController=require('../controllers/customer_controller');
router.get('/:id',customerController.showCustomerDetails);
router.use('/addFunds',require('./addFunds'));
router.use('/withdrawFunds',require('./withdrawFunds'));
router.use('/transferFunds',require('./transferFunds'));
router.use('/transactions',require('./transactions'));


module.exports=router;
