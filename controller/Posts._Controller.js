const Posts = require("../models/Posts");
const User = require("../models/User");
const AppErr = require("../utils/AppErr");


//Creates a post which then 
//push post.id into user's posts array
const CreatePost = async (req,res,next) => {
  console.log(req);
    try {
        //Finding user in session
        const user = await User.findById(req.session.userAuth);
        if(user){
            const SavedPost = await Posts.create({
                title:req.body.Title,
                image:req.file.path,
                content:req.body.Content,
                User:req.session.userAuth,
            })
            //pushing post_id into users post Array
            user.Posts.push(SavedPost._id);
            await user.save();
            res.json({user});
        }else{
            throw new AppErr("User Not Found!",401)
        }
    } catch (error) {
        next(error);
    }
}

const GetPosts = async (req,res,next) => {
    try {
        //finding user post through user id in posts objects
        const posts = await Posts.find({User:req.session.userAuth});
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