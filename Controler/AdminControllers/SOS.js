var SOS = require("../../Models/SOSModels/SOS");
var SOSf = require("../../Models/SOSModels/SOS");

module.exports.Showall = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      const backSOS = await SOS.find({});
      console.log("all SOSs", backSOS);
      await res.json(backSOS);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports.Program = async (req, res) => {
    try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      const backSOS = await SOSf.find({});
      console.log("all SOSs", backSOS);
      const re= backSOS.map((i)=>{
        return(i.Program)
      })
      console.log(re);
      await res.json(re);
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.ShowOne = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out");
      const backSOS = await SOS.findById(req.params.id).populate({path:"Categories"
      ,populate:{path:"Courses",model:"ProgramCourses",
      populate:{path:'PreRequisites',model:'Course'}}});
      console.log(backSOS)
      res.json(backSOS);
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.Delete = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out");
      const backSOS = await SOS.deleteOne({ _id: req.params.id });
      console.log("SOS", backSOS);
      await res.json(backSOS);
    } catch (err) {
      console.log(err);
    }
  };