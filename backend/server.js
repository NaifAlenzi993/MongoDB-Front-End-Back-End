const express = require("express")
const cors = require("cors")

require("./db");

const coursesModel = require("./coursesModel")

const app = express()
app.use(express.json());
app.use(cors());

const port = 5000

// const course = [{name: "C++" , description: "gkhdkjhgkjhk" , img: "http://ggg.jpg"},]


app.get("/" , (req , res)=>{
    res.status(200).json("hello")
})

app.get("/course" , async (req , res)=>{
    try {
        const cour = await coursesModel.find({})
        res.status(200).json(cour)
    } catch (error) {
        
    }
   
})

app.post("/course" , async (req , res)=>{
    const {name , description , img} = req.body;
    const cours = new coursesModel({name, description, img})
    try {
        const sav = await cours.save()
        const cour = await coursesModel.find({})
        res.status(200).json(cour)
    } catch (error) {
        res.status(403).json(error)
    }
    
})


app.delete("/course/:id" ,async (req , res)=>{
    let id = req.params.id
    
    try {
        const deletej = await coursesModel.deleteOne({_id : id})
        const cour = await coursesModel.find({})
        res.status(200).json(cour)
    } catch (error) {
        res.status(403).json(error)
    }
})

app.delete("/deleteAll" ,async (req , res)=>{
    console.log("sjkfhs");
    try {
        const deletej = await coursesModel.remove()
        const cour = await coursesModel.find({})
        res.status(200).json(cour)
    } catch (error) {
        res.status(403).json(error)
    }
})





app.listen( port , ()=>{
    console.log("server is runing on Port : " + port);
})

