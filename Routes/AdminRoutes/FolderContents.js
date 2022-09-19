var express = require("express");
var router = express.Router();
const Contents = require("../../Controler/AdminControllers/Folders/FolderContents");

router.route("/Theory").post(Contents.Theory);
router.route("/Lab").post(Contents.Lab);
router.route("/TheoryMidSes").put(Contents.MidSesTheory);
router.route("/LabMidSes").put(Contents.MidSesLab);
router.route("/showTheory").get(Contents.ShowTheory);
router.route("/showLab").get(Contents.ShowLab);
router.route("/showLabReq").get(Contents.ShowLabReq);
router.route("/updatedate").put(Contents.updatedate);

module.exports = router;
