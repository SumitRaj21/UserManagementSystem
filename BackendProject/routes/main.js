const express=require('express');
const userSignup = require('../controllers/signup');


const router=express.Router();

router.post('/users/register',userSignup);

module.exports=router;