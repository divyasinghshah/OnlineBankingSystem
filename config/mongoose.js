const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/bank-db');
const db= mongoose.connection;

db.on('error',console.error.bind(console,'Error in Connecting Db'));
db.once('open',function(){
    console.log("Successfully connected to db");
});