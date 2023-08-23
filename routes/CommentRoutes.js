
const express = require("express");
const { CreateComment,
        GetComments,
        GetComment,
        UpdateComment,
        DeleteComment,
         } = require("../controller/comments_Controller");
const router = express.Router();

//Route: 1  - Create Comment  :
router.post("/CreateComment",CreateComment);

//Route: 2  - Fetch Comments :
router.get("/GetComments",GetComments);

//Route: 3  - Fetch Comment through  id:
router.get("/GetComment/:id",GetComment);

//Route: 4  - Update Comment Through  id:
router.put("/UpdateComment/:id",UpdateComment);

//Route: 5? - Delete Comment Through id:
router.delete("/DeleteComment/:id",DeleteComment);

module.exports = router;