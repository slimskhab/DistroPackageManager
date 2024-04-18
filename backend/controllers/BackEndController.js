const BackEnd = require("../models/BackEndModel");
const Counter = require("../models/CounterModel");

const addBackEnd=async(req,res)=>{
    try {
      const {backEndTitle,backEndUrl}=req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "autovalBackEnd" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

   
    const backEnd = new BackEnd({
      id: counter.seq,
      backEndTitle,
      backEndUrl
    });

    await backEnd.save();

    res.status(201).json({
      status: "success",
      message: "Added BackEnd",
      backEnd
    });
    } catch (error) {
      console.log(error)
        return res.status(500).json({ error: 'Server Error!' });

    }
}

const getAllBackEnds=async (req,res)=>{
  try{
      const backEnds=await BackEnd.find({})
      return res.status(200).json({
          status: "success",
          message: "BackEnds retrieved",
          backEnds
        }); 
  }catch(e){
      console.error(e);
    res.status(500).json({
      message: "Server Error!"
    });
  }
}

const deleteBackEnd = async (req, res) => {
  try {
    const BackEndId = req.body.BackEndId;

    const deletedBackEnd = await BackEnd.findOneAndDelete({
      id: BackEndId,
    });

    if (!deletedBackEnd) {
      return res.status(404).json({ message: "BackEnd not found" });
    }

    res.status(200).json({
      status: "success",
      message: "BackEnd deleted",
      BackEnd: deletedBackEnd,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error!",
    });
  }
};

module.exports = {
  addBackEnd,
  getAllBackEnds,
  deleteBackEnd
};