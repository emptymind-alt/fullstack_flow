const express =require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');



const server =express();
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('database connected');
}
//schema
const userSchema = new mongoose.Schema({
    userName: String,
    password:String
  });
  //model
  const User = mongoose.model('User', userSchema);

//middlewire
server.use(cors());
server.use(bodyParser.json());

server.post('/demo',async (req,res)=>{
    let user = new User();
    user.userName = req.body.userName;
    user.password = req.body.password;
   const doc = await user.save();
    
     console.log(doc);
    res.json(doc);
})
//read
server.get('/demo',async (req,res)=>{
    const docs = await User.find({});
    res.json(docs);
})
server.listen(8080,()=>{
    console.log('server started')
})
