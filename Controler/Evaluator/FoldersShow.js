var Userdoc = require("../../Models/User");
var Folder = require("../../Models/Folders");
var Evaldoc = require("../../Models/EvalFolder");

module.exports.Showall = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {      
        console.log("user",req.user._id)
        const user = await Userdoc.findById({_id:req.user._id}).
        populate({path:"EvaluateFolders",model:"Eval",populate:{path:"Folder",model:"Folder",
        populate:{path:"Course",model:"ProgramCourses"}}}).
        populate({path:"EvaluateFolders",model:"Eval",populate:{path:"Folder",model:"Folder",
        populate:{path:"User",model:"User"}}})
       
        
        console.log("EvaluateFolders",user)
        await res.status(200).json(user.EvaluateFolders)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };
module.exports.ShowId = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {  
        const user = await Userdoc.findById(req.params.id).
        populate({path:"EvaluateFolders",model:"Eval",populate:{path:"Folder",model:"Folder",
        populate:{path:"Course",model:"ProgramCourses"}}}).
        populate({path:"EvaluateFolders",model:"Eval",populate:{path:"Folder",model:"Folder",
        populate:{path:"User",model:"User"}}})
        console.log("EvaluateFolders",user.EvaluateFolders)
        await res.status(200).json(user.EvaluateFolders)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };
  module.exports.ShowFolder = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {  
        const user = await Folder.find({}).
        populate("Course User Evaluator")
        console.log("EvaluateFolders",user)
        await res.status(200).json(user)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };
  module.exports.ShowComp = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {  
        const eval1 = await Evaldoc.findOne({_id:req.params.id}).populate("Folder")
console.log("eval1",eval1)
console.log("eval1.Folder",eval1.Folder.files)

const eval = await Evaldoc.findOne({_id:req.params.id}).populate("Folder")
        .populate({path:"Folder",
        populate:{path:"Course",model:"ProgramCourses"}}).
        populate({path:"Folder",
        populate:{path:"User",model:"User"}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Question.Base64",model:"Base64"}}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Solution.Base64",model:"Base64"}}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Awardlist.Base64",model:"Base64"}}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Best.Base64",model:"Base64"}}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Average.Base64",model:"Base64"}}})
        
        .populate({path:"Folder",
        populate:{path:"files",populate:{path:"Worst.Base64",model:"Base64"}}})
        

        .populate({path:"Folder",
        populate:{path:"ICEF",model:"Base64"}})
        
        .populate({path:"Folder",
        populate:{path:"Obe",model:"Base64"}})
        
        .populate({path:"Folder",
        populate:{path:"LectureDeliveryRecord",model:"Base64"}})
        
        // console.log("Question",eval.Folder.files)
        console.log("returning 1 2 3 ...",)
        console.log("_id",eval.Folder.files)

        // console.log("Folder_id",eval.Folder._id)
        // console.log("ICEF",eval.Folder.ICEF._id)

        await res.status(200).json(eval.Folder)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };
  