const mongoose = require("mongoose");



const PackageSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    packageName:{
        type:String,
        required:true,
    },
    packageSize: {
        type: Number,
        required: true,
        default:0
    },
    status: {
        type: String,
        required: true,
        default: "Available",
    },
    numberOfDownloads: {
        type: Number,
        required: true,
        default:0
    },
    hitMissRate:{
        type:Number,
        required:true,
        default:0.5
    },
    packageRepository:{
        type:String,
        required:true,
    },
}, { timestamps: true });

const Package = mongoose.model("Package", PackageSchema);

module.exports = Package;
