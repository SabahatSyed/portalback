var express = require("express");
var router = express.Router();
var Repo = require("../../Controler/AdminControllers/Repo");

router.route("/add").post(Repo.Add);
router.route("/show").get(Repo.Showall);
router.route("/showwithecat").get(Repo.ShowwithCatalogdesc);
router.route("/showwithCDF").get(Repo.ShowwithCDF)
router.route("/:id").delete(Repo.Delete).get(Repo.ShowOne).put(Repo.Update)

module.exports = router;
