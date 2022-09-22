var express = require("express");
var router = express.Router();
var EvalFolder = require("../../Controler/Evaluator/FoldersEavlatorAssign");
var FoldersShow = require("../../Controler/Evaluator/FoldersShow");

router.route("/add").post(EvalFolder.Add);
router.route("/add2").post(EvalFolder.Add2);
router.route("/showAll").get(FoldersShow.Showall);
router.route("/showAllbyid/:id").get(FoldersShow.ShowId);
router.route("/showComp/:id").get(FoldersShow.ShowComp);
router.route("/showfolder").get(FoldersShow.ShowFolder);

module.exports = router;
