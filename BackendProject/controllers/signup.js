const bcrypt=require('bcrypt');
const User=require('../models/users');



const userSignup=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        let userExist = await User.findOne({
            where: {
                email: email
            }
        });
        if(!userExist){
            const hashpassword= await bcrypt.hash(password, 10);
            const user = await User.create({ name:name, email:email, password: hashpassword });
            return res.status(201).json({ message: "user Account created successfully" });
        } else{
            return res.status(409).json({ message: 'Email  already exist!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Signup  API',
            error
        })
    }
};

module.exports=userSignup;