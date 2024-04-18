const express=require("express")
const router=express.Router();

const{ addBackEnd, getAllBackEnds, deleteBackEnd } = require("../controllers/BackEndController");

router.post("/add",addBackEnd)
router.get("/",getAllBackEnds)
router.post("/delete",deleteBackEnd)



module.exports=router