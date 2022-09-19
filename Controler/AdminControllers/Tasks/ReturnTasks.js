const Task = require("../../../Models/Tasks");
const coursedoc = require("../../../Models/CourseModels/Course");
const ReturnCourse = require("../../../Models/CourseModels/ReturnCourse");
const VersionCourse=require("../../../Models/CourseModels/CourseVersion")
const ReturnedSOS = require("../../../Models/SOSModels/ReturnSOS");
const VersionSOS=require("../../../Models/SOSModels/SOSVersions")
const SOSdoc=require("../../../Models/SOSModels/SOS")
const ProgramCourses=require("../../../Models/CourseModels/ProgramWiseCourses")
const SOSCourse=require("../../../Models/CourseModels/SOSCourse")
const ReturnedCDF = require("../../../Models/CDFModels/ReturnCDF");
const CDFdoc = require("../../../Models/CDFModels/CDF");
const VaersionCDF = require("../../../Models/CDFModels/CDFVersions");
const genCDF = require("../../../Models/CDFModels/CDFGeneral");
const ReturnedSyllabus = require("../../../Models/SyallabusModels/ReturnSyllabus");
const Syllabusdoc = require("../../../Models/SyallabusModels/Syllabus");
const VaersionSyllabus = require("../../../Models/SyallabusModels/SyllabusVersion");
const genSyllabus = require("../../../Models/SyallabusModels/SyllabusGeneral");

module.exports.Showall = async (req, res) => {
    try {
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const task = await Task.find({Status:req.params.status}).populate("User").populate("Course");     
      console.log(task)
      await res.status(200).json(task);
    } catch (err) {
        res.status(400).json("error");
        console.log(err);
    }
  };
    
module.exports.Lock = async (req, res) => {
    try {
      
      if (!req.user) return await res.status(401).json("Timed Out");
      if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
      const task = await Task.findById(req.params.id).populate("Course");
      
      if(task.taskType=="Create Catalog Description"||task.taskType=="Update Catalog Description"){
        const obj = await ReturnCourse.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        const finalcourse = await coursedoc.create({
          Code: obj.Code,
          Name: obj.Name,
          Credit: obj.Credit,
          LectureHoursWeek: obj.LectureHoursWeek ,
          LabHoursWeek:obj.LabHoursWeek,
          Category:obj.Category,
          PreRequisites:obj.PreRequisites,
          catalogue: obj.catalogue,
          objectiveList:obj.objectiveList ,
          Books:obj.Books
        });
        console.log("finalcourse",finalcourse)
        await Task.deleteOne({_id:req.params.id});
        await ReturnCourse.deleteOne({Code:task.Course.Code})
        await VersionCourse.deleteMany({Code:task.Course.Code})
        console.log(finalcourse)
        await res.status(200).json(finalcourse);
      }

      else if(task.taskType=="Create SOS"||task.taskType=="Update SOS"){
        console.log("Task",task)
        const obj = await ReturnedSOS.findOne({Program:task.Program}).populate({path:"Categories"
        ,populate:{path:"Courses",model:"SOSCourse",
        populate:{path:'PreRequisites',model:'Course'}}});
        console.log("obj",obj)
        const cats = await Promise.all(obj.Categories.map(async(e) => {
          const cors = await Promise.all(e.Courses.map(async(i) => {
              delete i._id
              console.log("i",i)
              const doc = await ProgramCourses.create({          
                Program: i.Program,
                Code: i.Code,
                Name: i.Name,
                Credit: i.Credit,
                LectureHoursWeek: i.LectureHoursWeek ,
                LabHoursWeek:i.LabHoursWeek,
                Category:i.Category,
                PreRequisites:i.PreRequisites,
                catalogue: i.catalogue,
                objectiveList:i.objectiveList ,
                Books:i.Books})   
              return await doc          
           })
           )
           console.log("cors",cors)
           e.Courses = cors
           return await e
       }))
       console.log("cats",cats)
       obj.Categories=cats
        console.log(obj)
        const finalSOS = await SOSdoc.create({Program:obj.Program,Year:obj.Year,Categories:obj.Categories});
        console.log("finalSOS",finalSOS)        
        await Task.deleteOne({_id:req.params.id});
        await ReturnedSOS.deleteOne({Program:task.Program})
        await VersionSOS.deleteMany({Program:task.Program})
        await SOSCourse.deleteMany({Program:task.Program})
        console.log(finalSOS)
        await res.status(200).json(finalSOS);
      }
      
      else if(task.taskType=="Create CDF"||task.taskType=="Update CDF"){
        const obj = await ReturnedCDF.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        const SOS = await SOSdoc.find({})
        await genCDF.create({
          Code: obj.Code,
          Topics: obj.Topics,
          CLOs: obj.CLOs,
          textBook: obj.textBook ,
          referenceBook:obj.referenceBook
          })
        SOS.forEach(async(i)=>{
          const CDF = await CDFdoc.create({
            Program:i.Program,
            Code: obj.Code,
            Topics: obj.Topics,
            CLOs: obj.CLOs,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
            console.log("finalCDF",CDF)
            }
          )   
           
        await Task.deleteOne({_id:req.params.id});
        await ReturnedCDF.deleteOne({Code:task.Course.Code})
        await VaersionCDF.deleteMany({Code:task.Course.Code})
        console.log(genCDF)
        res.status(200).json(genCDF);
      }

      else if(task.taskType=="Create Syllabus"||task.taskType=="Update Syllabus"){
        const obj = await ReturnedSyllabus.findOne({Code:task.Course.Code},{_id:0})
        console.log(obj)
        const SOS = await SOSdoc.find({})
        await genSyllabus.create({
          Code: obj.Code,
          Plan:obj.Plan,
          textBook: obj.textBook ,
          referenceBook:obj.referenceBook
          })
        SOS.forEach(async(i)=>{
          const Syllabus = await Syllabusdoc.create({
            Program:i.Program,
            Code: obj.Code,
            Plan:obj.Plan,
            textBook: obj.textBook ,
            referenceBook:obj.referenceBook
            })
            console.log("finalSyllabus",Syllabus)
            }
          )   
           
        await Task.deleteOne({_id:req.params.id});
        await ReturnedSyllabus.deleteOne({Code:task.Course.Code})
        await VaersionSyllabus.deleteMany({Code:task.Course.Code})
        console.log(genSyllabus)
        await res.status(200).json(genSyllabus);
      }


      
    } catch (err) {
        res.status(400).json("error");
        console.log(err);
    }
  };

// module.exports.Revision = async (req, res) => {
//     try {
//       if (!req.user) return await res.status(401).json("Timed Out");
//       if(!req.user.Roles.includes("Admin")) return res.status(401).json("Unautherized");
//       const task = await Task.find({Status:req.params.status});     
//       console.log(task)
//       res.status(200).json(task);
//     } catch (err) {
//         res.status(400).json("error");
//         console.log(err);
//     }
//   };
