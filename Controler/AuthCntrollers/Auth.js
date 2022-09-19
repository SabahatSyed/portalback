var User = require("../../Models/User");
var bcrypt = require("bcrypt");
var { createjwts } = require("../../Utils/JWTs");
module.exports.registerAdmin = async (req, res) => {
  try {
    const { Name, Email, Password, Phone } = req.body;
    let old = await User.findOne({ Email });
    if (old) {
      res.status(401).json("already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(Password, salt);
    const newu = await User.create({
      Name,
      Email,
      Phone,
      Password: hashPassword,
      Roles: ["Admin"],
    });
    res.status(201).json(newu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports.Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json("is not a User");
    if(!user.Activated)return res.status(401).json("Deactivated");
    const match = await bcrypt.compare(Password, user.Password);
    if (!match) return res.status(401).json("wrong password");
    const AccessTokens = createjwts(user, "Access key", "10s");
    const RefreshTokens = createjwts(user, "Refersh Key", "10m");
    res.cookie("AccessTokens", AccessTokens, {
      MaxAge: 600000,
      httpOnly: true,
    });
    res.cookie("RefreshTokens", RefreshTokens, {
      MaxAge: 600000,
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports.Check = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json("not login");
  res.status(200).json(user);
};
module.exports.Logout = async (req, res) => {
  res.cookie("AccessTokens", "", {
    MaxAge: 0,
    httpOnly: true,
  });
  res.cookie("RefreshTokens", "", {
    MaxAge: 0,
    httpOnly: true,
  });
  res.json("logged out");
};
