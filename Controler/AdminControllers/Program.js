var Program = require("../../Models/Program");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const pre = await Program.findOne({Degree:req.body.Degree,Program:req.body.Program});
    if(pre)return await res.json("Already Exists");
    const program = await Program.create(req.body);
    console.log("program added", program);
    await res.status(201).json(program);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const program = await Program.find({});
    console.log("all programs", program);
    await res.status(200).json(program);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const program = await Program.findById(req.params.id)
    console.log(program)
    res.status(200).json(program);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const program = await Program.deleteOne({ _id: req.params.id });
    console.log("all programs", program);
    await res.json(program);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out"); 
    if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");   
    const pre = await Program.findOne({Degree:req.body.Degree,Program:req.body.Program});
    if(pre)return await res.json("Already Exists");
    
    const program = await Program.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all programs", program);
    await res.json(program);
  } catch (err) {
    console.log(err);
  }
};
