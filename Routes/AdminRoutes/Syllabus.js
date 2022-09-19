var express = require("express");
var router = express.Router();
var Syllabus = require("../../Controler/AdminControllers/Syllabus");
var returnedsyllabus = require("../../Controler/AdminControllers/ReturnedSyllabus");

router.route("/show").get(Syllabus.Showall);
router.route("/ReturnedCourse/:Code").get(returnedsyllabus.ViewOne);
router.route("/:id").delete(Syllabus.Delete).get(Syllabus.ShowOne);
router.route("/shower/:Code").get(Syllabus.Shower);

module.exports = router;
