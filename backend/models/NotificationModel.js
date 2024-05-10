const mongoose = require("mongoose");



const NotificationSchema = mongoose.Schema({
    notificationContent:{
        type:String,
        required:true,
    },
    notificationType:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
