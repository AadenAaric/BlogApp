const { CreateAccount,
        GetAccounts,
        GetAccount,
        UpdateAccount,
        DeleteAccount,
        login,
        logout } = require("../controller/User_Controller");
const express = require("express");
const router = express.Router();
const Authorize = require("../middlewares/Authorize");
const { upload } = require("../configurations/cloudinary");



//Route: 1  - Create User Account:
router.post("/CreateAccount",upload.single("file"),CreateAccount);

//Route: 2  - Fetch User Accounts:
router.get("/GetAccounts",Authorize,GetAccounts);

//Route: 3  - Fetch User Account through User id:
router.get("/GetAccount/:id",Authorize,GetAccount);

//Route: 4  - Update User Account Through User id:
router.put("/UpdateAccount/:id",Authorize,UpdateAccount);

//Route: 5? - Delete User Account Through User id:
router.delete("/DeleteAccount/:id",Authorize,DeleteAccount);

//Route: 6? - Log In User into the System! through session:
router.post("/login",login);

//Route: 7? - Log Out User into the System! through session:
router.get("/logout",logout);

module.exports = router;