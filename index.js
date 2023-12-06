const express = require('express');
const productRoutes = require('./Routes/Signup.routes');
const connectToMongoDb = require('./DataBase/connection');
require('dotenv').config()

let app = express()
app.use(express.json())
app.use("/api/signup", productRoutes)

app.all('*', (req, res)=>{
    return res.status(404).json({error:true, message:"Page not found"})
})

app.use((err,req,res,next)=>{
    console.log("Error : ", err);
    if(err.statusCode){
        res.status(err.statusCode).json({error:true, message: err.message})
    }
    res.status(500).json({error:true, message: err.message})
})

let startServer = async()=>{
    try{
        app.listen(process.env.DEV_PORT, ()=>{
            console.log(`Server is running on port ${process.env.DEV_PORT}!`);
        })
    
        await connectToMongoDb(process.env.DEV_MONGO_URL)
        console.log("MongoDb Connected Successfully");
    }
    catch(err){
        console.log(err);
    }
}
startServer();
