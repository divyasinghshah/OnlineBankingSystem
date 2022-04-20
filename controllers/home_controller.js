
const Customer=require('../models/customer');

module.exports.home= async function(req,res){

    try{
        let customers=await Customer.find({});    
        return res.render('home',{
            customer:customers
        });
    }
    catch(err){        
        console.log(err);
        return res.redirect('back');

    }
    
}

module.exports.showAll= async function(req,res){
    

    try{
        let customers=await Customer.find({});    
        return res.render('allCustomers',{
            customer:customers
        });
    }
    catch(err){        
        console.log(err);
        return res.redirect('back');

    }
    
}

module.exports.addNew=async function(req,res){
    try{
            
        return  res.render('createCustomer');
    }
    catch(err){        
        console.log(err);
        return res.redirect('back');

    }

}

module.exports.create=function(req,res){
    Customer.create({
        email:req.body.email,
        name:req.body.name,
        
        dob:req.body.dob,
        gender:req.body.gender,
        address:req.body.address,
        phone:req.body.phone,
        imgUrl:req.body.image
    },function(err,customer){
        if(err){
            console.log(err);
            return res.redirect('back');

        }
        console.log("New Customer Added");
         Customer.find({},function(err,customers){
             if(err){console.log(err); return;}

             return res.render('allCustomers',{
                customer:customers
            });

         });    
        
    });
}