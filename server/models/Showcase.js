const mongoose=require("mongoose");
 

const showcase=new mongoose.Schema({
    show:{
        type:String
    }
});

const Show=mongoose.model('Showcase',showcase);

module.exports = Show;