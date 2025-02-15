const Testimonial =require("../models/Testimonials");
const cloudinary=require("cloudinary");

const add=async(req,res)=>{
    try{
        const { name, job, feedback,profileImage } = req.body;
       
    
           const picture=await cloudinary.uploader.upload(profileImage,{
             folder:"avatars",
             width:150,
             crop:"scale"
           });
        // Create new testimonial
        const newTestimonial = new Testimonial({
          name,
          job,
          feedback,
          profileImage: picture.secure_url, // Store Cloudinary URL in DB
        });
    
        await newTestimonial.save();
        res.json({ message: "Testimonial added successfully", newTestimonial,status:true });
    }catch(err){
        console.log(err.message);
    }
}

const allTestimonial= async (req, res) => {
    try {
      const testimonial = await Testimonial.find({});
  
      if (!testimonial || testimonial.length == 0) {
        return res.json({ status: false, message: "No Courses Found" });
      }
      return res.json({status:true, testimonial });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

const deleteTestimonial=async(req,res)=>{
    try{
        const {_id}=req.body;
        console.log(_id)
       await Testimonial.deleteOne({ _id});
       res.json({status:true})
    }catch(err){
      console.log(err.message);
    }
  }

const edit=async(req,res)=>{
  try{
    const { name, job, feedback,profileImage,id } = req.body;
       
      let profileImageUrl;
      const isCloudinaryUrl = (url) => url.startsWith("http") && url.includes("cloudinary");
          if (isCloudinaryUrl(profileImage)) {
            profileImageUrl = profileImage; // Use the existing URL if already a Cloudinary URL
          } else {
            const uploadedThumbnail = await cloudinary.uploader.upload(profileImage, {
              folder: "avatars",
              width: 150,
              crop: "scale",
            });
            profileImageUrl = uploadedThumbnail.url;
          }
   
 // Create new testimonial
 await Testimonial.findByIdAndUpdate({_id:id},{
  name,
  job,
  feedback,
  profileImage: profileImageUrl,
 })
 res.json({ message: "Testimonial Edit successfully",status:true });
  }catch(err){
    console.log(err.message);
  }
}
module.exports={add,deleteTestimonial,allTestimonial,edit};