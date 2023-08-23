const Comments = require("../models/Comments")
const Posts = require("../models/Posts")
const User = require("../models/User")
const AppErr = require("../utils/AppErr")



const CreateComment = async (req,res,next) => {
    try {
        const user = await User.findById(req.session.userAuth);
        const post = await Posts.findById(req.body.Post);
        if(user && post){
            const SavedComment = await Comments.create({
                User:req.session.userAuth,
                Post:req.body.Post,
                content:req.body.content
            })
            user.Comments.push(SavedComment._id);
            await user.save();
            post.Comments.push(SavedComment._id);
            await post.save();
            
            res.json({user,post});
        }else{
            throw new Error("User or Post Not Found!")
        }
    } catch (error) {
        next(new AppErr(error.message,500));
    }
}

const GetComments = async (req,res,next) => {
    try {
        const cmnt = await Comments.find().populate("User");
        res.json(cmnt)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const GetComment = async (req,res,next) => {
    let id = req.params.id;
    try {
        const cmnt = await Comments.findById(id);
        res.json(cmnt)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

const UpdateComment = async (req,res,next) => {
    let id = req.params.id;
    try {
        const cmnt = await Comments.findByIdAndUpdate(id,req.body);
        res.json(cmnt)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}


const DeleteComment = async (req,res,next) => {
    let id = req.params.id;
    try {
        const cmnt = await Comments.findByIdAndRemove(id,req.body);
        res.json(cmnt)
      } catch (error) {
        next(new AppErr(error.message,500));
      }
}

module.exports = {
    CreateComment,
    GetComments,
    GetComment,
    UpdateComment,
    DeleteComment
}