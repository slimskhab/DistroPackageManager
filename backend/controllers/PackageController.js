const Package = require("../models/PackageModel");
const Counter = require("../models/CounterModel");
const Repository = require("../models/RepositoryModel");

const addPackage=async(req,res)=>{
    try {
      const {packageName,packageRepository}=req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalPackage" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const repository=await Repository.findOne({repositoryTitle:packageRepository})
    if(!repository){
      return res.status(404).json({ message: "repository not found" });
    }
   
    const package = new Package({
      id: counter.seq,
      packageName,
      packageRepository
    });

    await package.save();

    res.status(201).json({
      status: "success",
      message: "Added Package",
      package
    });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Server Error!' });

    }
}

const getAllPackages=async (req,res)=>{
  try{
      const packages=await Package.find({})
      return res.status(200).json({
          status: "success",
          message: "Packages retrieved",
          packages
        }); 
  }catch(e){
      console.error(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const deletePackage = async (req, res) => {
  try {
    const packageId = req.body.packageId;

    const deletedPackage = await Package.findOneAndDelete({
      id: packageId,
    });

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Package deleted",
      package: deletedPackage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addPackage,
  getAllPackages,
  deletePackage
};