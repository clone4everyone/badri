const mongoose=require("mongoose");

const testimonial =new mongoose.Schema({
    name:{
        type:String,
    },
    job:{
        type:String,
    },
    feedback:{
        type:String
    },
    profileImage:{
        type:String
    },
    star:{
        type:Number
    }
})


const Testimonial = mongoose.model('Testimonal',testimonial);

module.exports=Testimonial;