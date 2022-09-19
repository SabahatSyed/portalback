var Repo = require("../../Models/RepoCourse");
var coursedoc = require("../../Models/CourseModels/Course");
var CDFdoc = require("../../Models/CDFModels/CDFGeneral");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    //Check weather Code already exist 
    const Repos = await Repo.findOne({Code:req.body.Code});
    const courses = await coursedoc.findOne({Code:req.body.Code});
    if(Repos||courses)return await res.json("Already Exists Code");
    //Check weather Name already exist 
    const course = await coursedoc.findOne({Name:req.body.Name});
    const Reps = await Repo.findOne({Name:req.body.Name});
    if(Reps||course)return await res.json("Already Exists Name");
    
    const repo = await Repo.create(req.body);
    console.log("Repo added", repo);
    await res.json(repo);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const Repos = await Repo.find({});
    console.log("all Repos", Repos);
    await res.json(Repos);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowwithCatalogdesc= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await coursedoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })
    console.log("all courses with CatalogDescriptions", reps);
    await res.json(reps);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowwithCDF= async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const course = await CDFdoc.find({});
    const Repos = await Repo.find({});
    const reps = Repos.filter(i=>{
      return course.find(e=>{
          return(e.Code==i.Code)
      })
    })
  console.log("all courses with CatalogDescriptions", reps);
  await res.json(reps);
  } catch (err) {
  console.log(err);
  }
};
  module.exports.ShowOne = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const Repo1 = await Repo.findById(req.params.id);
      console.log(Repo1)
      res.json(Repo1);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.Update = async (req, res) => {
    try {
      if (!req.user) return await res.json("Timed Out"); 
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      
      const Repos = await Repo.findOne({Code:req.body.Code});
      const courses = await coursedoc.findOne({Code:req.body.Code});
      if(Repos||courses)return await res.json("Already Exists Code");
      
      //Check weather Name already exist 
      const course = await coursedoc.findOne({Name:req.body.Name});
      const Reps = await Repo.findOne({Name:req.body.Name});
      if(Reps||course)return await res.json("Already Exists Name");
      
      const Re = await Repo.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      console.log("all programs", Re);
      await res.json(Re);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.Delete = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const repo = await Repo.deleteOne({ _id: req.params.id });
      console.log("all Repos", repo);
      await res.json(repo);
    } catch (err) {
      console.log(err);
    }
  };
