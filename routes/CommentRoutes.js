
const express = require("express");
const { CreateComment,
        GetComments,
        GetComment,
        UpdateComment,
        DeleteComment,
         } = require("../controller/comments_Controller");
const router = express.Router();
const Authorize = require("../middlewares/Authorize");

//Route: 1  - Create Comment  :
router.post("/CreateComment",Authorize,CreateComment);

//Route: 2  - Fetch Comments :
router.get("/GetComments",Authorize,GetComments);

//Route: 3  - Fetch Comment through  id:
router.get("/GetComment/:id",Authorize,GetComment);

//Route: 4  - Update Comment Through  id:
router.put("/UpdateComment/:id",Authorize,UpdateComment);

//Route: 5? - Delete Comment Through id:
router.delete("/DeleteComment/:id",Authorize,DeleteComment);

module.exports = router;