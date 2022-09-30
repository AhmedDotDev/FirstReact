const mongoose= require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
firstname:{
    type: String,
    required: true
},
lastname:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true,
    unique:true

}
,
password:{
    type: String,
    required: true
},
phone:{
    type: String,
    required: true
},
adress:{
    type: String,
},
});
const User=mongoose.model('users',UserSchema);
User.createIndexes();
module.exports=User