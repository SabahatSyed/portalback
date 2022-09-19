var express = require("express");
var router = express.Router();
var returnedSOS = require("../../Controler/AdminControllers/ReturnedSOS");
var SOS = require("../../Controler/AdminControllers/SOS");

router.route("/ReturnedSOS/:Program").get(returnedSOS.ViewOne);
router.route("/show").get(SOS.Showall);
router.route("/Programs").get(SOS.Program)
router.route("/:id").delete(SOS.Delete).get(SOS.ShowOne);

module.exports = router;
