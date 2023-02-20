

const jwt=require('jsonwebtoken')


const authentication=(req,res,next)=>{
    let token=req.headers.authorization
console.log(token)
    if(token){
        let  decoded = jwt.verify(token, 'masai');
        if(decoded){
            next()
        } else{
            res.send('pls enter valid creadentials')
        }
    }else{
        res.send('pls enter valid creadentials') 
    }
}

module.exports={
    authentication
}