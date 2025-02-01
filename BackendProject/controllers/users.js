const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../models/users');

// -----------JWT token ------
const accessToken = (id) => {
    return jwt.sign({ userId : id } ,process.env.JWT_SECRET,{expiresIn:'2h'});
};

// ---------User login ------
const userlogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        let userExist = await User.findOne({ where: { email } });
        if(userExist){
            const isPasswordValid=await bcrypt.compare(password, userExist.password);
            if(isPasswordValid){
                res.status(200).json({success: true, message:"User Login Successfull",token:accessToken(userExist.id)});
            }else{
                return res.status(401).json({success: false, message:"Invalid Password"});
            }
        }else{
            return res.status(409).json({ message: 'Account does not exist!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login  API',
            error
        })
    }
}

// ------------User Profile-------
const userProfile=async(req,res)=>{
    try {
        //  console.log(req.user.dataValues);
       res.status(200).send(req.user.dataValues);
    } catch (error) {
     console.log(error)
     res.status(500).send({
         success:false,
         message:'Error in Login  API',
         error
     })
    }
 }

 //-----------User Profile Update-------
 const updateProfile=async(req,res)=>{
    try {
        // console.log(req.body);
        const {name,email,phone,gender,address,profession}=req.body;
        // console.log(req.user.id);
      const update=  await User.update({
                name:name,
                email:email,
                phonenumber:phone,
                gender:gender,
                address:address,
                profession:profession   
            },
            {
                where: { id: req.user.id }
            }
      )
       res.json({ success:true, message:'User Profile Update Successful'}); 
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Error in Login  API',
            error
        });
    
    }
}

module.exports={
    userlogin,
    userProfile,
    updateProfile
}