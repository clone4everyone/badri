const Message=require("../models/Message");

const putMsg=async(req,res)=>{
    try{
     const {name,email,message}=req.body;
     await Message.create({name,email,message});

     res.json({status:true})
    }catch(err){
       res.json({status:false,message:'Cannot Drop Message'})
    }
}

const  getMsg=async(req,res)=>{
    try{
    const msg=await Message.find({});
      return res.json({status:true,msg})
    }catch(err){
        console.log(err.message)
    }
}

module.exports={putMsg,getMsg}