const Posts = require("../models/Posts");
const User = require("../models/User");
const AppErr = require("../utils/AppErr");

const CreatePost = async (req,res,next) => {
    try {
        const user = await User.findById(req.body.User);
        if(user){
            const SavedPost = await Posts.create({
                title:req.body.Title,
                image:req.body.Image,
                content:req.body.Content,
                User:req.body.User,
            })
            user.Posts.push(SavedPost._id);
            await user.save();
            res.json({user});
        }else{
            throw new Error("User Not Found!")
        }
    } catch (error) {
        next(new AppErr(error.message,500));
    }
}

const GetPosts = async (req,res,next) => {
    try {
        const posts = await Posts.find();
        res.json(posts)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
   }



const GetPost = async (req,res) => {
    let id = req.params.id; 
    try {
        const posts = await Posts.findById(id);
        res.json(posts)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const UpdatePost = async (req,res) => {
    let id = req.params.id; 
    try {
        const posts = await Posts.findByIdAndUpdate(id,req.body);
        res.json(posts)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const DeletePost = async (req,res) => {
    let id = req.params.id; 
    try {
        const posts = await Posts.findById(id);
        res.json(posts)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

module.exports = {
    CreatePost,
    GetPosts,
    GetPost,
    UpdatePost,
    DeletePost
}