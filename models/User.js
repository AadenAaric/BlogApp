const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    
    FullName:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },
    
    image:{
        type: String,
        required:true
    },

    country:{
        type: String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    isAdmin:{
      type:Boolean,
      default:false  
    },
    
    Posts: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts"
    }],

    Comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }],
},
{
    timestamps:true
}
)

const User = mongoose.model("User", userSchema);

module.exports = User;