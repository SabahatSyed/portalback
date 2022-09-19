const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/CourseModels/CourseVersion")
const Task = require("../../../Models/Tasks");
const ReturnCourse = require("../../../Models/CourseModels/ReturnCourse");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseCreation");
    console.log("CourseCreation",user.CourseCreation)
    await res.status(200).json(user.CourseCreation)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseCreation');
    const task  = await Task.findOne({User:req.user._id,Course:{$in:user.CourseCreation}})
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    console.log("\n\n\n\n\n\n\n\n CourseCreation",user.CourseCreation)
    const newCourseCreation =  user.CourseCreation.filter((x)=>{
      if(x.Code!=req.params.Code) return x._id
    })
    user.CourseCreation = newCourseCreation
    console.log("\n\n\n\n\n\n\n\n newCourseCreation",newCourseCreation)
    const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    console.log("\n\n\n\n\n\n\n\n newUser",newuser)
    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(!Version)return res.status(404).json("Not Found")
    const obj = Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)

    //error is here
    const retrn = await ReturnCourse.create( {Code: obj.Code,
    Name: obj.Name,
    Credit: obj.Credit,
    LectureHoursWeek: obj.LectureHoursWeek ,
    LabHoursWeek:obj.LabHoursWeek,
    catalogue: obj.catalogue,
    objectiveList:obj.objectiveList ,
    Books:obj.Books
  })
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
