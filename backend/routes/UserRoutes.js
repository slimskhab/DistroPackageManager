const express=require("express");
const { getAllUsers } = require("../controllers/UserController");
const router=express.Router();


router.get("/",getAllUsers)



module.exports=router