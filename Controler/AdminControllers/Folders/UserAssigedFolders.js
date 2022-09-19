var Folderdoc = require("../../../Models/Folders");
var Userdoc = require("../../../Models/User");
module.exports.Showall = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      try {
      
        const user = await Userdoc.findById(req.user._id).populate("CourseFolders").
        populate({path:"CourseFolders",populate:{path:"Course",model:"ProgramCourses"}});
        console.log("CourseFolders",user)
        console.log("CourseFolders",user.CourseFolders)
        await res.status(200).json(user.CourseFolders)
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
      
        const user = await Userdoc.findById(req.params.id).populate("CourseFolders").
        populate({path:"CourseFolders",populate:{path:"Course",model:"ProgramCourses"}});
        console.log("CourseFolders",user)
        console.log("CourseFolders",user.CourseFolders)
        await res.status(200).json(user.CourseFolders)
        } catch (err) {
          console.log(err);
          await res.status(400).json("error")    
        }  
    } catch (err) {
      console.log(err);
    }
  };