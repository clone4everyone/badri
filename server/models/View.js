const mongoose=require('mongoose');

const Views=new mongoose.Schema({
userID:{
    type:String
},
projectId:{
      type:String
}
});

const View =mongoose.model('View',Views);

module.exports=View;