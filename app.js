const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users')


// app.set({strictQuery:false})

//Databse Connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
mongoose.connection.on("connected", () => {
    console.log("Datbase connected");
})
mongoose.connection.on("error", () => {
    console.log("Database Error")
})


//init server
const app = express();
app.use(express.json());


app.get('/users', async (req, res) => {
    try {

        const users = await User.find({})
        res.json(users);

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

app.post('/users', async (req, res) => {
    try {
        const user=new User({username:req.body.username,password:req.body.password})
        await user.save();
        console.log("User Created");
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

app.delete('/users', async (req, res) => {
    try {
        
        await User.deleteOne({_id:req.body.id});
        console.log("User Deleted");
        res.send("User Deleted")
        

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
app.patch('/users', async (req, res) => {
    try {
        
        await User.findByIdAndUpdate(req.body.id,{username:req.body.username});
        console.log("User Updated");
        res.send("User Updated")
        

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
app.put('/users', async (req, res) => {
    try {
        
        await User.findByIdAndUpdate(req.body.id,{username:req.body.username,
            password:req.body.password});
        console.log("User Updated");
        const user= await User.find({_id:req.body.id});
        console.log(user)
        res.send(user)
        

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})



app.listen(3100, (req, res) => {
    console.log("listening on port 3000");
})