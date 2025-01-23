const mongoose=require("mongoose");

const messages=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    message:{
        type:String,
    }
})

const Message=mongoose.model('Message',messages);
module.exports=Message;