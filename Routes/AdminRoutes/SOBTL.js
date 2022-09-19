var express = require("express");
var router = express.Router();
const BTL = require("../../Controler/AdminControllers/SOBTL/BTL");
const SO = require("../../Controler/AdminControllers/SOBTL/SO");

router.route("/addBTL").post(BTL.Add);
router.route("/addSO").post(SO.Add);
router.route("/showBTL").get(BTL.Showall);
router.route("/showSO").get(SO.Showall);
router.route("/BTL/:id").delete(BTL.Delete).put(BTL.Update).get(BTL.ShowOne);
router.route("/SO/:id").delete(SO.Delete).put(SO.Update).get(SO.ShowOne);

module.exports = router;
