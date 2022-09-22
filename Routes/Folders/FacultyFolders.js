var express = require("express");
var router = express.Router();
var Folders = require("../../Controler/AdminControllers/Folders/FacultyFolderUpload");

router.route("/add/:id").put(Folders.Add);
router.route("/showOne/:id").get(Folders.showOne);
router.route("/SubmitaRound/:id").put(Folders.SubmitaRound);
router.route("/addICEF/:id").put(Folders.ICEFSubimt);
router.route("/addObe/:id").put(Folders.ObeSubimt);
router.route("/addLec/:id").put(Folders.LecSubimt);
router.route("/addEvaluation/:id").put(Folders.addEvaluation);
router.route("/editEvaluation/:id").put(Folders.editEvaluation);

module.exports = router;
