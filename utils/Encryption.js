const bcrypt = require("bcryptjs");


//Password or AnyKind of Sensitive Data Encryption:
const EncryptPassword = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);  
        let passwordHash = await bcrypt.hash(password,salt);
        return passwordHash;
    } catch (error) {
        console.log(`Error with encryption: ${error}`);
    }
    
}

//The Hash Generated Can Compared to Password to Check if its Same: return Boolean
const VerifyPassword = (password, hash) => {
  return bcrypt.compare(password,hash)
  .then((result)=>{return result})
  .catch((err)=>{console.log("error:" +err.message);})
};

module.exports = {
    EncryptPassword,
    VerifyPassword,
}