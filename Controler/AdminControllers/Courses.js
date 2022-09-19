var coursedoc = require("../../Models/CourseModels/Course");

module.exports.Add = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const precourses = await coursedoc.findOne({Code:req.body.Code});
    const precourse = await coursedoc.findOne({Name:req.body.Name});
    if(precourses)return await res.json("Already Exists Code");
    if(precourse)return await res.json("Already Exists Name");
    const course = await coursedoc.create(req.body);
    console.log("course added", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Showall = async (req, res) => {
  try {
    console.log(req.user)
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.find({});
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.ViewOnebyCode = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findOne({Code:req.params.Code}).populate('PreRequisites')
    console.log(course)
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.ShowOne = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findById(req.params.id).populate('PreRequisites');
    console.log(course)
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

module.exports.Delete = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.deleteOne({ _id: req.params.id });
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
module.exports.Update = async (req, res) => {
  try {
    if (!req.user) return await res.json("Timed Out");
    const course = await coursedoc.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    console.log("all courses", course);
    await res.json(course);
  } catch (err) {
    console.log(err);
  }
};
