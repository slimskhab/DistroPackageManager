const Repository = require("../models/RepositoryModel");
const Counter = require("../models/CounterModel");
const BackEnd = require("../models/BackEndModel");
const cron = require('node-cron');
const Notification = require('../models/NotificationModel');
const addRepository=async(req,res)=>{
    try {
      const {repositoryTitle,repositoryBackEnd}=req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalRepository" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    console.log(req.body)
console.log(repositoryBackEnd)
    const backEnd=await BackEnd.findOne({backEndUrl:repositoryBackEnd})
    console.log(backEnd)
    if(!backEnd){
      return res.status(404).json({ message: "BackEnd not found" });
    }
   
    const repository = new Repository({
      id: counter.seq,
      repositoryTitle,
      repositoryBackEnd
    });

    await repository.save();

    res.status(201).json({
      status: "success",
      message: "Added Repository",
      repository
    });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Server Error!' });

    }
}

const getAllRepositorys=async (req,res)=>{
  try{
      const repositories=await Repository.find({})
      return res.status(200).json({
          status: "success",
          message: "Repositories retrieved",
          repositories
        }); 
  }catch(e){
      console.error(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const deleteRepository = async (req, res) => {
  try {
    const RepositoryId = req.body.RepositoryId;

    const deletedRepository = await Repository.findOneAndDelete({
      id: RepositoryId,
    });

    if (!deletedRepository) {
      return res.status(404).json({ message: "Repository not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Repository deleted",
      Repository: deletedRepository,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};



// Function to check repository sizes and send notifications
const checkRepositorySizes = async () => {
  console.log("executed")
  try {
    const repositories = await Repository.find({});
    repositories.forEach(async (repository) => {
      if (repository.repositorySize > 100 * 1024 * 1024) { // 100 MB in bytes
        // Send notification
        const notification = new Notification({
          notificationContent: `Repository "${repository.repositoryTitle}" size exceeds 100 MB.`,
          notificationType: 'Repository Size Exceeded',
        });
        await notification.save();
      }
    });
  } catch (error) {
    console.error('Error checking repository sizes:', error);
  }
};

// Schedule the function to run every minute
cron.schedule('* * * * *', checkRepositorySizes);

// Export the function for manual triggering (optional)
module.exports = {
  checkRepositorySizes,
};


module.exports = {
  addRepository,
  getAllRepositorys,
  deleteRepository
};