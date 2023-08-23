const { default: mongoose, Schema } = require("mongoose");

const postSchema = new Schema({

    title:{
        type: String,
        required: true
    },

    image:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    Comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }]



    
})

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;