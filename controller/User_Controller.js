const session = require("express-session")
const User = require("../models/User")
const AppErr = require("../utils/AppErr")
const { EncryptPassword, VerifyPassword } = require("../utils/Encryption")
const { SendEmail } = require("../configurations/Nodemailer")





//Creating account while saving the user's.body into the.bodybase!
const CreateAccount = async (req,res,next) => {
   try {
    //Checking if User Exist:
    let user = await User.findOne({email:req.body.Email});
    //If the User exists with same email then Throwing Error
    //in else statement otherwise if user doesnt exist 
    //User is Created
    if(!user){
      try {
        const SavedUser = await User.create({
          FullName:req.body.FullName,
          email:req.body.Email,
          image:req.file.path,
          country:req.body.Country,
          password:await EncryptPassword(req.body.Password),
      })
      await SendEmail();
      res.json({SavedUser})
      } catch (error) {
        throw new AppErr(`Error With json.body in User Schema:${error}`,500);
      }
      
    }else{
      //Throwing Error to Catch block!
      throw new AppErr("User Already exist with this email!",401)
    }
   } catch (error) {
        //Throwing Error To GlobalErrorHandeler:
       next(error) 
   }
}
//Login Function using in which finding user then
//comparing its password with hash! 
//for now redirecting 'GetAccount' and
//saving the user in session for authentication and 
//authorization
async function login(req, res, next) {
  try {
    //Finding User
    let user = await User.findOne({ FullName: req.body.FullName })
    //if User exists:
    if (user) {
      //Comparing password with the hash that we created:
      let result = await VerifyPassword(req.body.password, user.password)
      //Checking the result returned by the VerifyPassword:
      if (result) {
        //Saving the User into a Session;
        try {
          req.session.userAuth = user._id
        } catch (Error) {
          throw new AppErr(Error.message, 500)
        }
        //redirecting to Different Route : GetAccount with User.ID
        res.redirect(`/GetAccount/${user._id}`)
      } else {
        //Throwing The Error if password is Correct or not according to hash:
        throw new AppErr("Incorrect Password", 401)
      }
    } else {
      //Throwing the Error if Username is Incorrect
      throw new AppErr("Incorrect Username or Password", 401)
    }
  } catch (error) {
    //Throwing all The Errors Raised to the GlobalErrorHandler:
    next(error)
  }
}

//logging out user by destroying Session;
const logout = async (req,res,next) => {
  try{
    req.session.destroy();//destroys the whole session;
    res.redirect("/GetAccounts")//for now redirecting to GetAccounts
  }catch(err){
    next(new AppErr("Already Logout!",500));
  }

}

const GetAccounts = async (req,res,next) => {
   try {
     const Accounts = await User.find();
     res.json(Accounts)
   } catch (error) {
     next(new AppErr(error.message,500));
   }
}

const GetAccount = async (req,res) => {
    let id = req.session.userAuth;
    try {
        const Account = await User.findById(id);
        res.json({message:"Profile","Account":Account});

      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const UpdateAccount = async (req,res) => {
    let id = req.params.id;
    try {
        const Account = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.json(Account)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const DeleteAccount = async (req,res) => {
    let id = req.params.id;
    try {
        const Account = await User.findByIdAndRemove(id);
        res.json(Account)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

module.exports = {
    CreateAccount,
    GetAccounts,
    GetAccount,
    UpdateAccount,
    DeleteAccount,
    login,
    logout,
}