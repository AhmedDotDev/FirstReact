const mongoose= require('mongoose');
const mongURI="mongodb://localhost:27017/maticA";
const connectMongo=()=>{
    mongoose.connect(mongURI,()=>{
        console.log("Connected");
    })
}
module.exports=connectMongo;    