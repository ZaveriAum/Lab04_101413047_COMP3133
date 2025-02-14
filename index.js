const express = require('express')
const app = express()
const User = require('./User')
const connectDB = require('./db')

app.use(express.json())

connectDB();

app.get('/', (req, res)=>{
    res.send("Hello Lab 4")
})

app.post('/users', async (req, res)=>{
    try{
        const input = req.body;
        const newUser = new User({
            ...input
        })
        await newUser.save(newUser)
        res.status(201).json({message: "New User Created"})
    }catch(e){
        res.status(e.statusCode || 500).json({ message: e.message || "Internal Server Error"})
    }
})

app.listen(4000, ()=>{
    console.log("Listining On => http://localhost:4000")
})