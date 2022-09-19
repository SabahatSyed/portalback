var Evaldoc = require("../../Models/EvalFolder");
var Userdoc = require("../../Models/User");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    var Folders = []       
    console.log("\nobj",req.body.obj)
    await Promise.all(req.body.obj.map(async(e)=>{
     try{
        
        const fold = await Evaldoc.create({
            Folder:e.Folders,
            User:req.body.User,
            Evalutation:[],
        })
        console.log("\n\nfold",fold)
        Folders.push(fold)            
        console.log("Folders",Folders)
      }    
      catch(er){
          console.error(er);
      }
    }))
    console.log("body",req.body)
    console.log("Folders",Folders)
    req.body.User.EvaluateFolders=[...Folders]
    const up = await Userdoc.findOneAndUpdate({ _id: req.body.User._id },req.body.User);
    console.log("User Updated",up)
    console.log("Folders",Folders)
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Add2 = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    
    const userF = await Userdoc.findById(req.body.User._id).populate("EvaluateFolders")
        
    var Folders =  []
    await Promise.all(userF.EvaluateFolders.map(async(i)=>{
        try{
         var check=false 
        req.body.obj.forEach((e)=>{
          console.log("e",e);
          
          if(i.Folder==e.Folders._id){
            check = true
          }
        })
        if(check){
          Folders.push(i)      
        }
        else{
          console.log("i",i);
          var r = await Evaldoc.deleteOne({_id:i._id}) 
          console.log(r);
        }
      }  
    
      catch(er){
          console.error(er);
      }
    }))
    console.log("\nFoldersffoldersffoldersffolders",Folders)

    await Promise.all(await req.body.obj.map(async(e)=>{
     try{
      
      var check=true 
      Folders.forEach(async(i)=>{
         if(i.Folder==e.Folder._id){
           check = false
         }
       })
     if(check){
      const fold = await Evaldoc.create({
        Folder:e.Folders,
        User:req.body.User,
        Evalutation:[],
        })
        Folders.push(fold)            
        }                    
    }    
     catch(er){
         console.error(er);
     }}
     ))
    req.body.User.EvaluateFolders=[...Folders]
    console.log("\n\n\n\nDFinasfsknaskdnasdnFolders",req.body.User.EvaluateFolders)
    
    const up = await Userdoc.findOneAndUpdate({ _id: req.body.User._id },req.body.User);
    console.log("User Updated",up)
    console.log("Folders",Folders)
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};
