const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    userIp:{
        type:String,
        required:true,
    },
    packagesUploaded:{
        type:Number,
        required:true,
        default:0
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
