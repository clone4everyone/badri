const  mongoose  = require("mongoose");

const wishlist=new mongoose.Schema({
  id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  userId:{
    type:String
  }
})

const Wishlist=mongoose.model('wishlist',wishlist);
module.exports=Wishlist;


