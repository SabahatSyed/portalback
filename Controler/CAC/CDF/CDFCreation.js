const Repo = require("../../../Models/RepoCourse");
const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/CDFModels/CDFVersions")
const Task = require("../../../Models/Tasks");
const ReturnCourse = require("../../../Models/CDFModels/ReturnCDF");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate("CourseCDF");
     console.log("CourseCDF",user)
    await res.status(200).json(user.CourseCDF)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id).populate('CourseCDF');
    const arr = user.CourseCDF.filter((i)=>{
        if(i.Code==req.params.Code)return i
      })
    const task  = await Task.findOne({User:req.user._id,Course:{$in:arr}})
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    console.log("\n\n\n\n\n\n\n\n CourseCDF",user.CourseCDF)
    const newCourseCDF =  user.CourseCDF.filter((x)=>{
      if(x.Code!=req.params.Code) return x._id
    })
    user.CourseCDF = newCourseCDF
    console.log("\n\n\n\n\n\n\n\n newCourseCDF",newCourseCDF)
    const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    console.log("\n\n\n\n\n\n\n\n newUser",newuser)
    const Version = await Versionodoc.find({Code:req.params.Code},{_id:0})
    if(!Version)return res.status(404).json("Not Found")
    const obj = Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)

    //error is here
    const retrn = await ReturnCourse.create( {
    Code: obj.Code,  
    Topics: obj.Topics,
    CLOs: obj.CLOs,
    textBook: obj.textBook,
    referenceBook: obj.referenceBook,
  })
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
