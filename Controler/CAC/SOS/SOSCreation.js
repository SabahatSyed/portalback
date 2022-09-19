const Userdoc = require("../../../Models/User");
const Versionodoc=require("../../../Models/SOSModels/SOSVersions")
const Task = require("../../../Models/Tasks");
const Returned = require("../../../Models/SOSModels/ReturnSOS");

module.exports.showUsers = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Osut");
    const user = await Userdoc.findById(req.user._id);
     console.log("SOS",user)
    await res.status(200).json(user.SOSCreation)
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")

    }
  };
  module.exports.Submit = async (req, res) => {
    try {
    if (!req.user) return await res.status(401).json("Timed Out");
    const user = await Userdoc.findById(req.user._id)
    const task  = await Task.findOne({User:req.user._id,taskType:"Create SOS",Program:req.params.Program,Course:null})
    task.Status = "Returned"
    console.log("\n\n\n\n\n\n\n\n",task,"\n\n\n\n\n\n\n\n")
    const newtask  = await Task.findByIdAndUpdate(task._id,task)
    console.log("\n\n\n\n\n\n\n\n",newtask,"\n\n\n\n\n\n\n\n")
    console.log("\n\n\n\n\n\n\n\n SOSCreation",user.SOSCreation)
    const newSOSCreation =  user.SOSCreation.filter((x)=>{
      if(x.Program!=req.params.Program) return x
    })
    user.SOSCreation = newSOSCreation
    console.log("\n\n\n\n\n\n\n\n newSOSCreation",newSOSCreation)
    const newuser =  await Userdoc.findByIdAndUpdate(user._id,user)
    console.log("\n\n\n\n\n\n\n\n newUser",newuser)
    const Version = await Versionodoc.find({Program:req.params.Program},{_id:0})
    if(!Version)return res.status(404).json("Not Found")
    const obj = Version[Version.length - 1]
    console.log("\n\n\n\n\n\n\n\n obj",obj)

    //error is here
    const retrn = await Returned.create({Program:obj.Program,Year:obj.Year,Categories:obj.Categories})
    console.log("returned \n\n\n\n\n",retrn)
  
    await res.status(200).json("submitted")
    } catch (err) {
      console.log(err);
      await res.status(400).json("error")
    }
  };
