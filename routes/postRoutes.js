const express = require('express')
const { authentication } = require('../middlewares/Authentication')
const { PostModel } = require('../model/PostModel')
const app = express()
const cors=require('cors')

app.use(cors())
app.use(express.json())

const postRouter = express.Router()
//app.use(authentication)

postRouter.post('/add',authentication, async (req, res) => {
    const data=req.body
    try {
       let newData=new PostModel(data)
       await newData.save()
       res.send(newData)
    } catch (err) {
       res.send('err')
    }
})

postRouter.get('/',authentication, async (req, res) => {
    try {
     let data=await PostModel.find()
     res.send(data)

    } catch (err) {
   res.send('error')
    }
})

postRouter.patch('/update/:id',authentication ,async (req, res) => {
    let id=req.params.id
    let {title,body,device,no_if_comments}=req.body
    try {
     
        let newData=await PostModel.updateOne({"_id":id},{$set:{title,body,device,no_if_comments}})
         res.send(newData)
    } catch (err) {
        res.send('error')
    }
})

postRouter.delete('/delete/:id',authentication, async (req, res) => {
    let id=req.params.id
    try {
       let data=await PostModel.remove({"_id":id})
       res.send(data)
    } catch (err) {
        res.send('error')
    }
})

postRouter.get('/top', authentication,async (req, res) => {
    try {
    let data=await PostModel.find().sort({no_if_comments:-1})
    res.send(data[0])
    } catch (err) {
        res.send('error')
    }
})

module.exports = {
    postRouter
}