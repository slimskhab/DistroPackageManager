const express=require("express")
const router=express.Router();

const{ addPackage, getAllPackages, deletePackage } = require("../controllers/PackageController");

router.post("/add",addPackage)
router.get("/",getAllPackages)
router.post("/delete",deletePackage)



module.exports=router