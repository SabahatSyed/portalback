var express = require("express");
var router = express.Router();
var courses = require("../../Controler/AdminControllers/ProgramCourses");

router.route("/show/:Program").get(courses.Showall);
router.route("/showcode/:Program/:Code").get(courses.ShowOneCode);
router.route("/:id").delete(courses.Delete).get(courses.ShowOne);

module.exports = router;
