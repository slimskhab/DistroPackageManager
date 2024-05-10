const Notification = require("../models/NotificationModel");

const getAllNotifications=async (req,res)=>{
  try{
      const notifications=await Notification.find({})
      return res.status(200).json({
          status: "success",
          message: "notifications retrieved",
          notifications
        }); 
  }catch(e){
      console.error(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}


module.exports = {
  getAllNotifications
};