const { default: mongoose, Schema } = require("mongoose");

const commentScheme = new Schema({

    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Posts",
        required:true,
    },  
    
    content:{
        type:String,
        required:true
    }

})

const Comments = mongoose.model("Comments",commentScheme);

module.exports = Comments;