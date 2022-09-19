var Folderdoc = require("../../../Models/Folders");
var Base64doc = require("../../../Models/Base64");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.status(401).json("Timed Out");
    if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
    const old = await Folderdoc.findById(req.params.id)    
    const isalready = old.files.find(obj => {
        return obj.Title === req.body.Title
      })
      console.log("isalready",isalready)
    if(isalready!=undefined){
        const fils =await Promise.all( old.files.map(async(x)=>{
          if(x.Title==req.body.Title){            

            await Base64doc.deleteOne({_id:x.Question.Base64})
            await Base64doc.deleteOne({_id:x.Solution.Base64})
            await Base64doc.deleteOne({_id:x.Awardlist.Base64})
            await Base64doc.deleteOne({_id:x.Best.Base64})
            await Base64doc.deleteOne({_id:x.Average.Base64})
            await Base64doc.deleteOne({_id:x.Worst.Base64})
                    
            req.body.Question.Base64 = await Base64doc.create({pdf:req.body.Question.Base64})
            req.body.Solution.Base64 = await Base64doc.create({pdf:req.body.Solution.Base64})
            req.body.Awardlist.Base64 = await Base64doc.create({pdf:req.body.Awardlist.Base64})
            req.body.Best.Base64 = await Base64doc.create({pdf:req.body.Best.Base64})
            req.body.Average.Base64 = await Base64doc.create({pdf:req.body.Average.Base64})
            req.body.Worst.Base64 = await Base64doc.create({pdf:req.body.Worst.Base64})     
                         
            return({
                    Title:req.body.Title,
                    Question:req.body.Question,
                    Solution:req.body.Solution,
                    Awardlist:req.body.Awardlist,
                    Best:req.body.Best,
                    Average:req.body.Average,
                    Worst:req.body.Worst
                })

            }
            else{
                return x
            }
        }))
        old.files=fils
    }
    else{
          req.body.Question.Base64 = await Base64doc.create({pdf:req.body.Question.Base64})
          req.body.Solution.Base64 = await Base64doc.create({pdf:req.body.Solution.Base64})
          req.body.Awardlist.Base64 = await Base64doc.create({pdf:req.body.Awardlist.Base64})
          req.body.Best.Base64 = await Base64doc.create({pdf:req.body.Best.Base64})
          req.body.Average.Base64 = await Base64doc.create({pdf:req.body.Average.Base64})
          req.body.Worst.Base64 = await Base64doc.create({pdf:req.body.Worst.Base64})            
        const obj = {
            Title:req.body.Title,
            Question:req.body.Question,
            Solution:req.body.Solution,
            Awardlist:req.body.Awardlist,
            Best:req.body.Best,
            Average:req.body.Average,
            Worst:req.body.Worst
        }
        old.files.push(obj)
    }
    
    console.log("old",old)
    const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},old);
    console.log("Folders",up)
    await res.status(201).json(up);
  } catch (err) {
    console.log(err);
  }
};

module.exports.SubmitaRound = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
        try {        
          if(req.body.Round=="Round1"){  
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Round1:true});
          console.log("CourseFolder",up)
          await res.status(200).json(up)
        }
        else if(req.body.Round=="Round2"){  
            const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Round2:true});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
          }
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    

}

module.exports.ICEFSubimt = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");
        try {                   
          const old = await Folderdoc.findById(req.params.id)    
          if(old.ICEF!=null){
            var r = await Base64doc.deleteOne({_id:old.ICEF})
            console.log("deleted",r)
          }
          const II = await Base64doc.create({pdf:req.body.ICEF})            
          
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{ICEF:II});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    
}

module.exports.ObeSubimt = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");        
        try {        
          const old = await Folderdoc.findById(req.params.id)               
          if(old.Obe!=null){
            var r = await Base64doc.deleteOne({_id:old.Obe})
            console.log("erwefz",r)
          }
          const II = await Base64doc.create({pdf:req.body.Obe})            
            
          const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Obe:II});
            console.log("CourseFolder",up)
            await res.status(200).json(up)
        }catch (err) {
            console.log(err);
            await res.status(400).json("error")    
        }  
      } catch (err) {
        console.log(err);
      }    
}
module.exports.LecSubimt = async (req, res) => {
    
  try {
      console.log(req.user)
      if (!req.user) return await res.json("Timed Out");
      if (!req.user.Roles.includes("Faculty")) return await res.status(401).json("UnAutherized");        
      try {        
        const old = await Folderdoc.findById(req.params.id)               
        if(old.LectureDeliveryRecord!=null){
          var r = await Base64doc.deleteOne({_id:old.LectureDeliveryRecord})
          console.log("erwefz",r)
        }
        const II = await Base64doc.create({pdf:req.body.LectureDeliveryRecord})            
          
        const up = await Folderdoc.findOneAndUpdate({_id:req.params.id},{Obe:II});
          console.log("CourseFolder",up)
          await res.status(200).json(up)
      }catch (err) {
          console.log(err);
          await res.status(400).json("error")    
      }  
    } catch (err) {
      console.log(err);
    }    
}
module.exports.showOne = async (req, res) => {
    
    try {
        console.log(req.user)
        if (!req.user) return await res.json("Timed Out");
        try {        
          const Folder = await Folderdoc.findById(req.params.id)
          console.log("CourseFolder",Folder)
          await res.status(200).json(Folder)
          } catch (err) {
            console.log(err);
            await res.status(400).json("error")    
          }  
      } catch (err) {
        console.log(err);
      }    

}
