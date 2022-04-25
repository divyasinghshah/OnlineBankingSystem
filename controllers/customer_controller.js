
const Customer=require('../models/customer');
const Transaction=require('../models/transactions');

module.exports.showCustomerDetails= async function(req,res){
    

    try{

        let customer= await Customer.findOne({accNo:req.params.id});
        let allcustomers=await Customer.find({});
        
        return res.render('customer',{
            customer:customer,
            allCustomers:allcustomers
        });
    }catch(err){
        console.log(err);
        return res.redirect('back');
    }

    
}

module.exports.addFunds= async function(req,res){
//     let x=;
//    console.log(typeof x);
    
        let  a = req.body.amount;
        a=Math.abs(Number(a.trim()));
      

    Customer.findById(req.params.id,function(err,cust){
        if(err){
            console.log(err);
            return res.redirect('back');
        }
        const newBal = cust.currentBal +a;
        Transaction.create({
            transactionType:"Credit",
            transferredFrom:"Self",
            transferredTo:"Self",
            balance:newBal,
            amount:a
        },function(err,transac){
            if(err){console.log(err); return res.redirect('back');}
            cust.transactions.push(transac);
            cust.save();

            Customer.findByIdAndUpdate(req.params.id,{
                currentBal:newBal 
            },function(err,c){
                if(err){console.log(err); return;}
                
                return res.redirect('back');
            });

        });
        
         
    });
}

module.exports.withdrawFunds= async function(req,res){
    //     let x=;
    //    console.log(typeof x);
        
            let  a = req.body.amount;
            a=Math.abs(Number(a.trim()));
          
    
        Customer.findById(req.params.id,function(err,cust){
            if(err){
                console.log(err);
                return res.redirect('back');
            }
            const newBal = cust.currentBal -a;
            Transaction.create({
                transactionType:"Debit",
                transferredFrom:"Self",
                transferredTo:"Self",
                balance:newBal,
                amount:a
            },function(err,transac){
                if(err){console.log(err); return res.redirect('back');}
                cust.transactions.push(transac);
                cust.save();
    
                Customer.findByIdAndUpdate(req.params.id,{
                    currentBal:newBal 
                },function(err,c){
                    if(err){console.log(err); return;}
                    
                    return res.redirect('back');
                });
    
            });
            
             
        });
    }


    module.exports.transferFunds= function(req,res){


           
       
                let  a = req.body.amount;
                a=Math.abs(Number(a.trim()));

                
            

             Customer.findById(req.params.id,function(err,customer){
                    if(err){
                        console.log(err);
                        return res.redirect('back');
                    }
                    const newBal = customer.currentBal-a;

                    
                    Customer.findOne({accNo:req.body.transferTo},function(err,c){
                        if(err){console.log(err); return res.redirect('back');}

                        Transaction.create({
                            transactionType:"Debit",
                            transferredFrom:"Self",
                            transferredTo:c.name,
                            balance:newBal,
                            amount:a
                        },function(err,transac){
                            
                            customer.transactions.push(transac);
                            customer.save();
                            Customer.findByIdAndUpdate(customer._id,{
                                currentBal:newBal 
                            },function(err,c){
                                if(err){
                                    console.log(err); return res.redirect('back');
                                }
                               
                                // return res.redirect('back');
                                Customer.findOne({accNo:req.body.transferTo},function(err,cust){
                                    if(err){
                                        console.log(err);
                                        return res.redirect('back');
                                    }
                                    const newBal = cust.currentBal +a;
                                    Transaction.create({
                                        transactionType:"Credit",
                                        transferredFrom:customer.name,
                                        transferredTo:"Self",
                                        balance:newBal,
                                        amount:a 
                                    },function(err,t){
                                        cust.transactions.push(t);
                                        cust.save();

                                        Customer.findByIdAndUpdate(cust._id,{
                                            currentBal:newBal 
                                        },function(err,c){
                                            if(err){console.log(err); return;}
                                            
                                            return res.redirect('back');
                                        });

                                    });

                                    
                                   
                                });
                            });
    
    
    
                        });

                    });

                                     
                   
                    
                });
          
                
                     
                
        
           

        }
    


        module.exports.showTransactions=function(req,res){

            
            Customer.findById(req.params.id).populate('transactions').exec(function(err,customer){
                if(err){console.log(err); return res.redirect('back');}
                return res.render('transaction',{
                    customer:customer,
                    allTransactions:customer.transactions
                });

            });
            

        }