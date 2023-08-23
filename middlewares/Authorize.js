const AppErr = require("../utils/AppErr")

const Authorize = (req,res,next) =>{
    try{
        if(!req.session.userAuth){
            throw new AppErr("Not Logged In",401);
        }else{
            next()
        }
    }catch(err){
        next(err);
    }
}

module.exports =  Authorize;