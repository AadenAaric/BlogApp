const { default: mongoose } = require("mongoose");
const AppErr = require("../utils/AppErr");

const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database COnnected...")

    }catch(err){
        console.log(err);
    }
}

const dbDisconnect = ()=>{
    mongoose.disconnect()
    .then(()=>{console.log("Database Disconnected!");})
    .catch((err)=>{
        console.log(`${err.name}: ${err.message}`);
    })
}
module.exports = {
    dbConnect,
    dbDisconnect,
}            