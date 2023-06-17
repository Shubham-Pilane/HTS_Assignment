const express=require("express")
const app=express()
const {connection}=require("./db")
const {UserRouter}=require("./routes/user.route")
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("This is a Home Page !!")
})

app.use("/user",UserRouter)




app.listen(8000,async()=>{

    try {
        await connection
        console.log("connected to atlas data base!!!")
    } catch (error) {
        console.log(error)
    }
console.log("Server is ruuning on 8000")
})

