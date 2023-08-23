
const express = require("express");
const { CreatePost,
        GetPosts,
        GetPost,
        UpdatePost,
        DeletePost,
         } = require("../controller/Posts._Controller");
const router = express.Router();
const Authorize = require("../middlewares/Authorize");
const { upload } = require("../configurations/cloudinary"); //will be used to upload images to cloudinary


//Route: 1  - Create User Post  :
router.post("/CreatePost", upload.single("file"),Authorize, CreatePost); //using upload middleware here to upload the file to cloudinary

//Route: 2  - Fetch Posts :
router.get("/GetPosts",Authorize,GetPosts);

//Route: 3  - Fetch Posts through  id:
router.get("/GetPost/:id",Authorize,GetPost);

//Route: 4  - Update Post Through  id:
router.put("/UpdatePost/:id",Authorize,UpdatePost);

//Route: 5? - Delete Post Through id:
router.delete("/DeletePost/:id",Authorize,DeletePost);

module.exports = router;