const jwt=require('jsonwebtoken')

const secret="jatinsharma";


const fetchuser=(req,res,next)=>{
    //getting id from the token and adding id to the req object
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).json({msg:"no token, authorization denied"});
    }
    try{
    const data=jwt.verify(token,secret)
    req.user=data.user;
    next();
    }
    catch{
        return res.status(401).json({msg:"token is not valid"});
    }
}
module.exports=fetchuser;