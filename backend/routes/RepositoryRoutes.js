const express=require("express")
const router=express.Router();

const{ addRepository, getAllRepositorys, deleteRepository } = require("../controllers/RepositoryController");

router.post("/add",addRepository)
router.get("/",getAllRepositorys)
router.post("/delete",deleteRepository)



module.exports=router