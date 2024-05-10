const express=require("express")
const router=express.Router();

const{ addPackage, getAllPackages, deletePackage, getTopFetchedPackages, getRecentlyFetchedPackages, getTotalMissRateAndPackageCount } = require("../controllers/PackageController");

router.post("/add",addPackage)
router.get("/",getAllPackages)
router.post("/delete",deletePackage)
router.get('/recent', getRecentlyFetchedPackages);
router.get('/top', getTopFetchedPackages);
router.get('/stats', getTotalMissRateAndPackageCount);


module.exports=router