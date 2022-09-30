const mongoose= require('mongoose');
const { Schema } = mongoose;

const Products = new Schema({
title:{
    type: String,
    required: true
},
desc:{
    type: String,
    required: true
},

price:{
    type: String,
    required: true
},
images:{
    type:String,
    required:true
}
 

});
const Product=mongoose.model('products',Products);
module.exports=Product