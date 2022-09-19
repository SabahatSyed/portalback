const Versionodoc=require("../../../Models/SOSModels/SOSVersions")
const SOSCoursedoc=require("../../../Models/CourseModels/SOSCourse")
module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")  
        console.log(req.body) 
        const cats = await Promise.all(req.body.Categories.map(async(e) => {
           const cors = await Promise.all(e.Courses.map(async(i) => {
                delete i._id
                // const old = await SOSCoursedoc.find({Code:i.Code,Program:req.body.Program})
                // console.log(old)
                // if(old.length>0){
                //     console.log("here")
                //     const doc = SOSCoursedoc.findOneAndUpdate({Code:i.Code,Program:req.body.Program},i)
                //     return await doc
                // }
                // else{
                //     console.log("here2")
                    i.Program=req.body.Program
                    const doc = await SOSCoursedoc.create(i)   
                    return await doc
                //}
            })
            )
            console.log("cors",cors)
            e.Courses = cors
            return await e
        }))
        console.log("cats",cats)
        req.body.Categories=cats
        const Version = await Versionodoc.create(req.body) 
        console.log("NewVersion",Version)
        await res.status(201).json(Version)
    }
    catch(err){
        console.log(err)
        await res.status(400).json(err)
    }
}
module.exports.ViewAll= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const Version = await Versionodoc.find({Program:req.params.Program}).populate({path:"Categories"
        ,populate:{path:"Courses",model:"SOSCourse",
        populate:{path:'PreRequisites',model:'Course'}}});
        if(!Version)return res.status(404).json("Not Found")
        console.log("Versions",Version)
        await res.status(200).json(Version)
    }
    catch(err){
        console.log(err)
        await res.status(400).json(err)
    }
}
module.exports.Latest= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const Version = await Versionodoc.find({Program:req.params.Program})
        .populate({path:"Categories",populate:{path:"Courses",model:"SOSCourse"
        ,populate:{path: 'PreRequisites', model: 'Course'}}})
        if(!Version)return res.status(404).json("Not Found")
        const obj = Version[Version.length - 1]
        console.log("Latest",obj)
        await res.status(200).json(obj)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const Version = await Versionodoc.findOne({_id:req.params.id}).populate('PreRequisites')
        if(!Version)return res.status(404).json("Not Found")
        console.log("Version1",Version)
        await res.status(200).json(Version)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
