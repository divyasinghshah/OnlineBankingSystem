const express=require('express');
const router=express.Router();

const customerController=require('../controllers/customer_controller');
router.post('/:id',customerController.transferFunds);



module.exports=router;
