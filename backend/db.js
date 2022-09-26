const mongoose= require('mongoose');
const mongURI="mongodb://localhost:27017maticA";
const connectMongo=()=>{
    mongoose.connect(mongURI,()=>{
        console.log("Connected");
    })
}
module.exports=connectMongo;