var mongoose = require("mongoose");
var ProgramCoursesSchema = new mongoose.Schema({
  
 Program: {
    type: String,
    required: true,
    },  
  Code: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Credit: {
    type: String,
    required: true,
  },
  LectureHoursWeek: {
    type: String,
    required: true,
  },
  LabHoursWeek: {
    type: String,
    required: true,
  },
  
  PreRequisites: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      default: "none",
    },
  ],

  catalogue: {
    type: String,
    default:""
  },
  objectiveList: {
    type: [
      {
        id: {
          type: String,
        },
        title: {
          type: String,
        },
        default:""
      },
    ],
  },
  Books: [
    {
      id: {
        type: String,
      },
      BookName: {
        type: String,
      },
      BookWriter: {
        type: String,
      },
      BookYear: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("ProgramCourses", ProgramCoursesSchema);
