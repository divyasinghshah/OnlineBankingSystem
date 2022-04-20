const express=require('express');
const port=8000;
const app=express();
const path=require('path');

const db=require('./config/mongoose');

const axios = require("axios");
const Customer=require('./models/customer');
const date=require('date-and-time');
 const routers=require('./routers');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('./assets'));
app.use(express.urlencoded());
  const putData=function(){

    axios
    .get("https://randomuser.me/api/?results=10")
    .then(({ data }) => {
        const dArr = [];
        data?.results?.forEach((user) => {
          const userObj = {
            name: user?.name?.first + " " + user?.name?.last,
            dob: user?.dob?.date,
            gender: user?.gender,
            address:
              user?.location?.street?.number +
              " " +
              user?.location?.street?.name +
              " " +
              user?.location?.city +
              " " +
              user?.location?.state +
              " " +
              user?.location?.country,
            email: user?.email,
            phone: user?.phone,
            imgUrl: user?.picture?.large,
          };
  
          dArr.push(userObj);
        });
  
        Customer
          .insertMany(dArr)
          .then(() => console.log("Saved"))
          .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

  }
 
  putData();





app.listen(port,function(e){
    if(e){
        console.log(e);
        return;
    }
    console.log("Server is up and running at port :"+ port);
});


app.use(express.urlencoded());
app.use('/',require('./routers'));