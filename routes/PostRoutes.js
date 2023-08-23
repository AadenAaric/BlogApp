
const express = require("express");
const { CreatePost,
        GetPosts,
        GetPost,
        UpdatePost,
        DeletePost,
         } = require("../controller/Posts._Controller");
const router = express.Router()

//Route: 1  - Create User Post  :
router.post("/CreatePost",CreatePost);

//Route: 2  - Fetch Posts :
router.get("/GetPosts",GetPosts);

//Route: 3  - Fetch Posts through  id:
router.get("/GetPost/:id",GetPost);

//Route: 4  - Update Post Through  id:
router.put("/UpdatePost/:id",UpdatePost);

//Route: 5? - Delete Post Through id:
router.delete("/DeletePost/:id",DeletePost);

module.exports = router;