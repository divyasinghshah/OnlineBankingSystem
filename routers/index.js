const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller')
router.get('/',homeController.home);
router.get('/allCustomers',homeController.showAll);
router.get('/addCustomer',homeController.addNew);
router.post('/createNewCustomer',homeController.create);
router.use('/customers',require('./customers'));


module.exports=router;