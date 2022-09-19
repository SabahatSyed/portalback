var Folderdoc = require("../../../Models/Folders");
var Userdoc = require("../../../Models/User");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    var Folders = []
    console.log("\nobj",req.body.obj)
    await Promise.all(req.body.obj.map(async(e)=>{
     try{
        
        const fold = await Folderdoc.create({Program:e.Program,
            Course:e.Course,
            Section:e.Section,
            User:req.body.User,
            files:[],
            LabTheory:"Theory",
        })
        console.log("\n\nfold",fold)
        Folders.push(fold)            
        console.log("Folders",Folders)
        if(e.Course.LabHoursWeek!="0"){            
          const foldlab = await Folderdoc.create({Program:e.Program,
            Course:e.Course,
            Section:e.Section,
            User:req.body.User,
            files:[],
            LabTheory:"Lab",
          })
          Folders.push(foldlab)
          console.log("\n\foldlab",foldlab)
          console.log("Folders",Folders)
        }                  
      }    
      catch(er){
          console.error(er);
      }
    }))
    console.log("body",req.body)
    console.log("Folders",Folders)
    req.body.User.CourseFolders=[...Folders]
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
    
    const userF = await Userdoc.findById(req.body.User._id).populate("CourseFolders").
        populate({path:"CourseFolders",populate:{path:"Course",model:"ProgramCourses"}});
        
    var Folders =  []
    await Promise.all(userF.CourseFolders.map(async(i)=>{
        try{
         var check=false 
        req.body.obj.forEach((e)=>{
          if(i.Course._id==e.Course._id&&e.Section==i.Section){
            check = true
          }
        })
        if(check){
          Folders.push(i)      
        }
        else{
          await Folderdoc.deleteOne({_id:i._id}) 
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
         if(i.Course._id==e.Course._id&&e.Section==i.Section){
           check = false
         }
       })
     if(check){
      const fold = await Folderdoc.create({Program:e.Program,
        Course:e.Course,
        Section:e.Section,
        User:req.body.User,
        files:[],
        LabTheory:"Theory",
    })
    Folders.push(fold)            
    if(e.Course.LabHoursWeek!="0"){            
      const foldlab = await Folderdoc.create({Program:e.Program,
        Course:e.Course,
        Section:e.Section,
        User:req.body.User,
        files:[],
        LabTheory:"Lab",
      })
      Folders.push(foldlab)
      }}
                        
    }    
     catch(er){
         console.error(er);
     }}
     ))
    req.body.User.CourseFolders=[...Folders]
    console.log("\n\n\n\nDFinasfsknaskdnasdnFolders",req.body.User.CourseFolders)
    
    const up = await Userdoc.findOneAndUpdate({ _id: req.body.User._id },req.body.User);
    console.log("User Updated",up)
    console.log("Folders",Folders)
    await res.status(201).json(Folders);
  } catch (err) {
    console.log(err);
  }
};
