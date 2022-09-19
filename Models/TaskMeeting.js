var mongoose = require("mongoose");

var TaskMeetingSchema = new mongoose.Schema({
  dateTime: { type: String },
  taskType: { type: String },
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("TaskMeeting", TaskMeetingSchema);
