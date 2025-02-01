const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv').config();
const bodyparser=require('body-parser');
const sequelize=require('./config/db');
const app=express();
const PORT=process.env.PORT;
// const User=require('./models/users.js');
// User.sync({ force: true });

// -------Middlewares-----
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));



// ---------Routes-------
app.use('/api/main',require('./routes/main.js'));
app.use('/api/users',require('./routes/users.js'));


async function initiate() {
    try {
     const res = await sequelize.sync();
     if(res){
        console.log("db started");
     }
     app.listen(PORT, ()=>{
        console.log(`Server started At port ${PORT}`);
    })
    } catch (err) {
      console.error('Error during server initialization:', err);
      process.exit(1); 
    }
  }
  initiate();