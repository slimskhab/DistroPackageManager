const mongoose = require("mongoose");



const RepositorySchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    repositoryTitle:{
        type:String,
        required:true,
    },
    numberOfPackages: {
        type: Number,
        required: true,
        default:0,
    },
    repostiorySize: {
        type: Number,
        required: true,
        default: 0,
    },
    repositoryStatus:{
        type:[String],
        required:true,
        status:["Active"]
    },
    repositoryBackEnd:{
        type:String,
        required:true,
    }
}, { timestamps: true });

const Repository = mongoose.model("Repository", RepositorySchema);

module.exports = Repository;
