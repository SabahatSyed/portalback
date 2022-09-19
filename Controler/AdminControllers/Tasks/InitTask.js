var InitTask = require("../../../Models/InitTask");
var Task = require("../../../Models/Tasks");
var Userdoc = require("../../../Models/User");
var ObjectId = require("mongoose").Types.ObjectId
module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    console.log(req.body)
    const Inittask = await InitTask.create(req.body);
    console.log("InitTask added", Inittask);
    await res.status(201).json(Inittask);
  } catch (err) {
    console.log(err);
  }
};

module.exports.UpdateTaskInit = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    // const Taskog = await InitTask.findOne({ _id: req.params.id }).populate("AssignMember").populate("Task")
    // Taskog.Task.forEach((e)=>{
    //   if(!req.body.AssignMember.includes(e.User)){
    //       if(Taskog.taskType=="Create Catalog Description"){
    //         const user = await Userdoc.findById(e)

    //         const up = await Userdoc.updateOne({ _id: e },
    //           { $pullAll : { CourseSyllabus :[ {_id : abc.Course }] } },
    //           { multi : true }  
    //         )}
    //   }
    // })
    const InitTask = await InitTask.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all InitTasks", InitTask);
    await res.json(InitTask);
  } catch (err) {
    console.log(err);
  }
};

  
  module.exports.ShowOne = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const InitTasks = await InitTask.findById(req.params.id).populate("AssignMember").populate("Task").populate({path:"Task",model:"Task",populate:{path: 'User', model: 'User'}})
      .populate ({path:"Task",model:"Task",populate:{path:'Course',model:'Repo'}});
      console.log("one task", InitTasks);
      await res.status(200).json(InitTasks);
    } catch (err) {
      console.log(err);
    }
  };
  
  
module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
    const Inis1 = await InitTask.findById(req.params.id).populate("AssignMember")
    console.log("ini",Inis1.Task)
    var clone =[]
    Inis1.Task.forEach(async(e) => {
      
      const abc = await Task.findById(e).populate("User")
      if(abc.taskType=="Create Catalog Description"){   
      //     clone = (abc.User.CourseCreation.filter((i)=>{
      //     if(!i.equals(abc.Course))return i
      //   }))
      //   console.log("\n\n\n clone",clone)
      //   abc.User.CourseCreation=clone
       const up = await Userdoc.updateOne({ _id: abc.User._id },
          { $pullAll : { CourseCreation :[ {_id : abc.Course }] } },
          { multi : true }  
        )
        console.log("\n\nup",up)  
      }
    
    else if(abc.taskType=="Create CDF"){
      const up = await Userdoc.updateOne({ _id: abc.User._id },
        { $pullAll : { CourseCDF :[ {_id : abc.Course }] } },
        { multi : true }  
      )
      console.log("\n\nup",up)  
    }
    else if(abc.taskType=="Create Syllabus"){
      const up = await Userdoc.updateOne({ _id: abc.User._id },
        { $pullAll : { CourseSyllabus :[ {_id : abc.Course }] } },
        { multi : true }  
      )
      console.log("\n\nup",up) 
    } 
    //  const up =  await Userdoc.findByIdAndUpdate({ _id: abc.User._id },abc.User);    
    //  console.log("\n\nabc.user",abc.User,"\n\nup",up) 
     await Task.deleteOne({ _id: e });
    })
    const Inittask = await InitTask.deleteOne({ _id: req.params.id });
    await res.status(204).json(Inittask);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
      const InitTasks = await InitTask.find({}).populate("AssignMember")
      console.log("all InitTasks", InitTasks);
      await res.json(InitTasks);
    } catch (err) {
      console.log(err);
    }
  };

// module.exports.Showallnotass = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const InitTasks = await InitTask.find({}).populate("AssignMember");
//     const response = InitTasks.filter((i)=>{
//         if(i.Task==null)return i
//     }) 
//     console.log("all InitTasks", response);
//     await res.json(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports.Showallass = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//       const InitTasks = await InitTask.find({}).populate("AssignMember");
//       console.log("all InitTasks", InitTasks);
//       await res.json(InitTasks);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// module.exports.UpdateTaskInit = async (req, res) => {
//   try {
//     if (!req.user) return await res.status(401).json("Timed Out");
//     if (!req.user.Roles.includes("Admin")) return await res.status(401).json("UnAutherized");
//     const InitTasks = await InitTask.findOneAndUpdate({ _id: req.params.id },req.body);
//     console.log("all InitTasks", InitTasks);
//     await res.json(InitTasks);
//   } catch (err) {
//     console.log(err);
//   }
// };
