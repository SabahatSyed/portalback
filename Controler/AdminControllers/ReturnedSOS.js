const ReturnSOS = require("../../Models/SOSModels/ReturnSOS");

module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status(401).json("unAutherized")      
        const rturn = await ReturnSOS.findOne({Program:req.params.Program}).populate({path:"Categories"
        ,populate:{path:"Courses",model:"SOSCourse",
        populate:{path:'PreRequisites',model:'Course'}}});
        console.log(rturn)
        if(!rturn)return res.status(404).json("Not Found")
        console.log("rturn",rturn)
        await res.status(200).json(rturn)
    }
    catch(err){
        await res.status(400).json(err)
    }
}
