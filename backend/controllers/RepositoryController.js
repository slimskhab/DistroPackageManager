const Repository = require("../models/RepositoryModel");
const Counter = require("../models/CounterModel");

const addRepository=async(req,res)=>{
    try {
      const {repositoryTitle,repositoryBackEnd}=req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalRepository" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

   
    const repository = new Repository({
      id: counter.seq,
      repositoryTitle,
      RepositoryUrl
    });

    await Repository.save();

    res.status(201).json({
      status: "success",
      message: "Added Repository",
      Repository
    });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Server Error!' });

    }
}

const getAllRepositorys=async (req,res)=>{
  try{
      const Repositorys=await Repository.find({})
      return res.status(200).json({
          status: "success",
          message: "Repositorys retrieved",
          Repositorys
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

module.exports = {
  addRepository,
  getAllRepositorys,
  deleteRepository
};