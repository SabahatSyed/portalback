var express = require("express");
var router = express.Router();
var meeting = require("../../Controler/Meeting/Meeting");

router.route("/create").post(meeting.Create);
router.route("/get/:id").get(meeting.GetMeeting);
router.route("/update").put(meeting.Update);
router.route("/add-availability/:tid").post(meeting.AddAvailability);
router.route("/get-availability/:tid").get(meeting.GetAvailability);
router.route("/get-all-availability").get(meeting.GetAllAvailability);
router.route("/delete/:id").delete(meeting.Delete);
router.route("/all").get(meeting.GetAll);

module.exports = router;
