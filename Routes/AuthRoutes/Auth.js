var express = require("express");
var router = express.Router();
var auth = require("../../Controler/AuthCntrollers/Auth");
var {getUser} = require("../../Middleware/User")

router.route("/registerAdmin").post(auth.registerAdmin);
router.route("/login").post(auth.Login);
router.route("/logout").post(getUser,auth.Logout);
router.route("/check").get(getUser,auth.Check);

module.exports = router;