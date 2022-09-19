const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/SyallabusModels/SyllabusVersion")
const Task = require("../../../Models/Tasks");
const ReturnSyllabus = require("../../../Models/SyallabusModels/ReturnSyllabus");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseSyllabus");;
    console.log(user.CourseSyllabus)
    await res.status(200).json(user.CourseSyllabus)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };

  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseSyllabus');
    const arr = user.CourseSyllabus.filter((i)=>{
        if(i.Code==req.params.Code)return i
      })
    const task  = await Task.findOne({User:req.user._id,Course:{$in:arr}})
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    console.log("\n\n\n\n\n\n\n\n CourseSyllabus",user.CourseSyllabus)
    const newCourseSyllabus =  user.CourseSyllabus.filter((x)=>{
      if(x.Code!=req.params.Code) return x._id
    })
    user.CourseSyllabus = newCourseSyllabus
    console.log("\n\n\n\n\n\n\n\n newCourseSyllabus",newCourseSyllabus)
    const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    console.log("\n\n\n\n\n\n\n\n newUser",newuser)
    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(!Version)return res.status(404).json("Not Found")
    const obj = Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)

    //error is here
    const retrn = await ReturnSyllabus.create( {
    Code: obj.Code,  
    Plan: obj.Plan
  })
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
