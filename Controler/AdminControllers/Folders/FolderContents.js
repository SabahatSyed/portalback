var TheoryContents = require("../../../Models/FolderContents/TheoryContents");
var LabContents = require("../../../Models/FolderContents/LabContents");
var TheoryReq= require("../../../Models/deadlineTheory");
var LabReq= require("../../../Models/deadlineLab");

module.exports.Theory = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const old = await TheoryContents.findOne({});
    var obj=req.body
    if(req.body.Round=="Round1"){
        if(old){
            if(old.Mid=="Mid"){
                obj.Mid="Mid"
            }
            else if(old.Mid=="Sessional"){
                obj.Mid="Sessional"
            }
            else{
                obj.Mid="Mid"
            }
        }
        else{
            obj.Mid="Mid"
        }
    }

    console.log("Round1","Round2",obj)
    if(old){
        
        if(req.body.Round=="Round1"){
        await TheoryContents.findByIdAndUpdate(old._id,{Round1:obj.Round1,Round2:old.Round2,Mid:obj.Mid})}
        else if(req.body.Round=="Round2"){
        await TheoryContents.findByIdAndUpdate(old._id,{Round1:old.Round1,Round2:obj.Round2,Mid:obj.Mid})}
        
        }
    else{    
        
        if(req.body.Round=="Round1")
        await TheoryContents.create({Round1:obj.Round1,Mid:obj.Mid});
        else if(req.body.Round=="Round2")
        await TheoryContents.create(old._id,{Round2:obj.Round2,Mid:obj.Mid})
                
    }

    await res.status(201).json("TheoryContents");
  } catch (err) {
    console.log(err);
  }
};

module.exports.Lab = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const old = await LabContents.findOne({});
  
      var obj=req.body
      if(req.body.Round=="Round1"){
        if(old){
            if(old.Mid=="Mid"){
                obj.Mid="Mid"
            }
            else if(old.Mid=="Sessional"){
                obj.Mid="Sessional"
            }
            else{
                obj.Mid="Mid"
            }
        }
        else{
            obj.Mid="Mid"
        }
      }
  
      console.log("Round1","Round2",obj)
      if(old){
          
          if(req.body.Round=="Round1")
          await LabContents.findByIdAndUpdate(old._id,{Round1:obj.Round1,Mid:obj.Mid})
          else if(req.body.Round=="Round2")
          await LabContents.findByIdAndUpdate(old._id,{Round2:obj.Round2,Mid:obj.Mid})
          
          }
      else{    
          
          if(req.body.Round=="Round1")
          await LabContents.create({Round1:obj.Round1,Mid:obj.Mid});
          else if(req.body.Round=="Round2")
          await LabContents.create(old._id,{Round2:obj.Round2,Mid:obj.Mid})
                  
      }  
      await res.status(201).json("LabContents");
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.MidSesTheory = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const old = await TheoryContents.findOne({});
      console.log(req.body)
      if(old){
        old.Round1.MidorSessioanls=req.body.MidSessional
        console.log("old",old)
          await TheoryContents.findByIdAndUpdate(old._id,old)
          await res.status(201).json("TheoryContents");
    
        }
      else{    
        await res.status(404).json("Not initizalized");     
                  
      }
  
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports.MidSesLab = async (req, res) => {
      try {
        if (!req.user) return await res.status(401).json("Timed Out");
        if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
        const old = await LabContents.findOne({});        
        console.log(req.body)
        if(old){
        old.Round1.MidorSessioanls=req.body.MidSessional
          await LabContents.findByIdAndUpdate(old._id,old)
          await res.status(201).json("LabContents");    
        }
      else{    
        await res.status(404).json("Not initizalized");     
                  
      }
  
    }  
     catch (err) {
        console.log(err);
      }
    };
    
  module.exports.ShowTheory = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await TheoryContents.findOne({});
      console.log("aa", aa);
      await res.status(200).json(aa);
    } catch (err) {
      console.log(err);
    }
  };
  module.exports.ShowLab = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await LabContents.findOne({});
      console.log("aa", aa);
      await res.status(200).json(aa);
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.ShowLabReq = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const aa = await LabReq.find({}).populate("Request_id");
      const bb=await TheoryReq.find({}).populate("Request_id");
      console.log("aa", aa);
      await res.status(200).json({Lab:aa,Theory:bb});
    } catch (err) {
      console.log(err);
    }
  };

  module.exports.updatedate = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      console.log("req.data",req.body)
      /*const aa = await LabReq.find({}).populate("Request_id");
      const bb=await TheoryReq.find({}).populate("Request_id");
      console.log("aa", aa);
      await res.status(200).json({Lab:aa,Theory:bb});*/
    } catch (err) {
      console.log(err);
    }
  };
