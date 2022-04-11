const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://swaraj1920:swaraj1920@cluster0.6yd9l.mongodb.net/carStore?retryWrites=true&w=majority")
.then(()=> console.log("Connected to DB"));

const userSchema = new mongoose.Schema({
    name:String,
    mail: String,
    password:String
})

const User = new mongoose.model("User", userSchema);

app.post("/login",(req,res)=>{
    const { mail, password} = req.body;
    User.findOne({mail:mail}, (err,user)=>{
        if(user){
            if(password === user.password){
                res.send({message: "User LOgged in",user})
            }else {
                res.send({message: "Check Password Again"})
            }
        } else {
            res.send({message:"User noT Registered"})
        }
    })
});
app.post("/register",(req,res)=>{
    // res.send("My api register")
    // console.log(req.body)
    const {name, mail, password} = req.body;
    User.findOne({mail:mail}, (err,user)=>{
        if(user){
            res.send({message:"Already registered"})
        } else {
            const user = new User({
                name, mail, password
            })
            user.save( err=> {
                if(err){
                    res.send(err);
                } else {
                    res.send({message: "Regsitered"})
                }
            })
        }
    })
});



app.listen(2525,()=>{
    console.log("Listening on Port 2525")
})