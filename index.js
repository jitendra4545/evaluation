const express=require('express')
const { connected } = require('./config/db')
const { postRouter } = require('./routes/postRoutes')
const { userRouter } = require('./routes/userRoutes')
require('dotenv').config()

const app=express()
const cors=require('cors')

app.use(cors())
app.use(express.json())
app.use('/users',userRouter)
app.use('/posts',postRouter)


app.get("/",(req,res)=>{
    res.send('Welcome to HomePage')
})




app.listen(process.env.port,async()=>{
    try{
        await connected
        console.log('server connected')
    }catch(err){
        console.log('server disconnected')
    }
    console.log(`server running on port ${process.env.port}`)
})