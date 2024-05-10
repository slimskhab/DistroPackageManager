const express=require("express");
const { getAllNotifications } = require("../controllers/NotificationController");
const router=express.Router();


router.get("/",getAllNotifications)



module.exports=router