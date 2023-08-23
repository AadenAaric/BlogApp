//handle Error Thrown By Routes
const GlobalErrorHandler = (err,req,res,next) =>{
    status_code = err.status_code || 500;
    console.log(status_code);

    res.status(status_code).json({
        status: err.status_code || 500,
        message: err.message,
        ErrorTrace: err.stack, 
    })
}

module.exports = GlobalErrorHandler;