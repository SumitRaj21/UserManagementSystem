const express=require('express');
const { userlogin, userProfile, updateProfile } = require('../controllers/users');
const userAuthenticate=require('../middlewares/auth');
const router=express.Router();

router.post('/login',userlogin);
router.get('/profile',userAuthenticate.authenticate, userProfile);
router.put('/update',userAuthenticate.authenticate, updateProfile);

module.exports=router;