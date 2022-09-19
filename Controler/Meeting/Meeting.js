var meetingdoc = require("../../Models/Meeting");
var taskmeetingdoc = require("../../Models/TaskMeeting");

module.exports.Create = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await taskmeetingdoc.create(req.body);
    console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Update = async (req, res) => {
  const body = req.body;
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.findOneAndUpdate({ _id: body.id }, body);
    console.log("meeting updated", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.AddAvailability = async (req, res) => {
  const time = { time: req.body, teacher_id: req.params.tid };
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.create(time);
    console.log("meeting updated", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAvailability = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc
      .findOne({
        teacherId: req.params.tid,
      })
      .populate("teacher_id");
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAllAvailability = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.find({}).populate("teacher_id");
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Delete = async (req, res) => {
  console.log(req.params.id);
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.findOneAndDelete({ _id: req.params.id });
    console.log("meeting deleted", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};

module.exports.GetMeeting = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.findOne({ _id: req.params.id });
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
module.exports.GetAll = async (req, res) => {
  try {
    // if (!req.user) return await res.json("Timed Out");
    const meeting = await meetingdoc.find().populate("availability.teacher_id");
    //   console.log("meeting added", meeting);
    await res.json(meeting);
  } catch (err) {
    console.log(err);
  }
};
