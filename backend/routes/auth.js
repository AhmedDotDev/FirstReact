const express= require('express')
const bcryptjs= require('bcryptjs')
const User=require('../models/Users')
const fetchUser=require('../middleware/fetchuser')

const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const JSON_SECRET_KEY="Acha"
const router=express.Router();
router.post( '/createuser',[
body('email','Enter Valid Email').isEmail(),
body('firstname', 'Please Enter Atlest 5 characters').isLength({ min: 5 }),
body('lastname', 'Please Enter Atlest 3 characters').isLength({ min: 3 }),
body('password').isLength({ min: 5, max: 20, }).withMessage('Password must be atleast 5 but not more than 20').matches(/^[A-Za-z0-9 .,'!&$]+$/).withMessage('Password must contain a Special character and num b/w 0-9'),

],async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   try {
    const salt=await bcryptjs.genSalt(10);
const mypass=await bcryptjs.hash(req.body.password, salt);
let user =await User.findOne({email: req.body.email});
if (user){
  return res.status(400).json({error : "Email Already exist"})
}
     user = await User.create({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:mypass,
        phone:req.body.phone,
        address:req.body.address,
    });
    const data={
      user:{
        id: user.id
      }
    }
    const authtoken=jwt.sign(data, JSON_SECRET_KEY)
    res.json({authtoken:authtoken})
   } catch (error) {
    res.json(
      { error: 'asdasdasd', message: error.message}
     )
   } 
    }
)
router.post( '/login',[
  body('email','Enter Valid Email').isEmail(),
  body('password','Password cannot be empty').exists(),],
  async (req, res)=>{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    let {email, password}=req.body;
    try {
      let user =await User.findOne({email});
      if (!user){
        return res.status(400).json({error : "Invalid Username or passsword"})
      }
      const pwd=await bcryptjs.compare(password, user.password)
      if (!pwd){
        return res.status(400).json({error : "Invalid Username or passsword"})
      }
      const data={
        user:{
          id: user.id
        }
      }
           
      const authtoken=jwt.sign(data, JSON_SECRET_KEY)
      res.json({authtoken:authtoken})
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }



      }
  )
  router.get(
  '/getuser', fetchUser, async (req,res)=>{
    try {
      const userid= req.user.id
      const user=await User.findById(userid).select('-password')
      res.send(user);
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Internal Server Error')
    }
  }  
  )
module.exports=router;