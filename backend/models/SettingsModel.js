const mongoose = require("mongoose");



const BackEndSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    backEndTitle:{
        type:String,
        required:true,
    },
    backEndUrl: {
        type: String,
        required: true,
    },
    associatedNumberOfRepos: {
        type: Number,
        required: true,
        default: 0,
    },
}, { timestamps: true });

const BackEnd = mongoose.model("BackEnd", BackEndSchema);

module.exports = BackEnd;
