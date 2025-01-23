const Listing=require('../models/ProjectModel');
const cloudinary=require("cloudinary");
const View = require("../models/View"); // Path to your Listing model
const Show=require("../models/Showcase")
const create=async(req,res)=> {
    try {
      const { formFields, listingPhotos,thumbnail } = req.body;
      
      const year = new Date().getFullYear();
      console.log("Received form fields:", formFields);
    //   console.log("Received listing photos:", listingPhotos);
  
      // Validate if listingPhotos were received
      if (!listingPhotos || listingPhotos.length === 0) {
        console.log("No photos uploaded");
        return res.status(400).send("No photos uploaded.");
      }
  
      // Upload each photo to Cloudinary
      const uploadPromises = listingPhotos.map(async (photo) => {
        return cloudinary.uploader.upload(photo, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
      });
       const picture=await cloudinary.uploader.upload(thumbnail,{
         folder:"avatars",
         width:150,
         crop:"scale"
       });


      const uploadedPhotoUrls = await Promise.all(uploadPromises);
       console.log("reached here")
      // Create a new listing with uploaded photo URLs
      const newListing = new Listing({
        ...formFields, // Spread form fields
        listingPhotoPaths: uploadedPhotoUrls.map((result) => result.url),
        year,
        thumbnail:picture.url
      });
  
      // Save the listing to the database
      await newListing.save();
  
      res.json({newListing,status:true});
    } catch (err) {
      console.error("Error creating listing:", err);
      res.status(500).json({ message: "Failed to create listing", error: err.message });
    }
  };

  const allProjects= async (req, res) => {
    try {
      const courses = await Listing.find({});
  
      if (!courses || courses.length == 0) {
        return res.json({ status: false, message: "No Courses Found" });
      }
      return res.status(200).json({ courses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }


  const update = async (req, res) => {
    try {
      const { formFields, listingPhotos, thumbnail,_id,status } = req.body;
      const year = new Date().getFullYear();
      console.log("Received form fields:", formFields);
  
      // Validate if listingPhotos were received
      if (!listingPhotos || listingPhotos.length === 0) {
        console.log("No photos uploaded");
        return res.status(400).send("No photos uploaded.");
      }
  
      // Check if an image is already a Cloudinary URL
      const isCloudinaryUrl = (url) => url.startsWith("http") && url.includes("cloudinary");
  
      // Process each photo in listingPhotos
      const uploadPromises = listingPhotos.map(async (photo) => {
        if (isCloudinaryUrl(photo)) {
          // If already a Cloudinary URL, return it directly
          return { url: photo };
        } else {
          // Otherwise, upload it to Cloudinary
          return cloudinary.uploader.upload(photo, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
        }
      });
  
      // Process the thumbnail
      let thumbnailUrl;
      if (isCloudinaryUrl(thumbnail)) {
        thumbnailUrl = thumbnail; // Use the existing URL if already a Cloudinary URL
      } else {
        const uploadedThumbnail = await cloudinary.uploader.upload(thumbnail, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
        thumbnailUrl = uploadedThumbnail.url;
      }
  
      const uploadedPhotoUrls = await Promise.all(uploadPromises);
  
      // Update the listing with uploaded or existing photo URLs
      const updatedListing = await Listing.findByIdAndUpdate(
        { _id }, // Assuming _id is included in formFields
        {
          ...formFields,
          listingPhotoPaths: uploadedPhotoUrls.map((result) => result.url),
          year,
          thumbnail: thumbnailUrl,
          status
        },
        { new: true } // Return the updated document
      );
  
      res.json({updatedListing , status:true});
    } catch (err) {
      console.error("Error updating listing:", err);
      res.status(500).json({ message: "Failed to update listing", error: err.message });
    }
  };

  const deleteProject=async(req,res)=>{
    try{
        const {_id}=req.body;
        console.log(_id)
       await Listing.deleteOne({ _id});
       res.json({status:true})
    }catch(err){
      console.log(err.message);
    }
  }


// Controller to handle project views
const incrementProjectView = async (req, res) => {
    try {
        const { userId, projectId } = req.body;

        // Check if the userId and projectId are provided
        if (!userId || !projectId) {
            return res.status(400).json({ message: "userId and projectId are required." });
        }

        // Check if a view record exists for the given userId and projectId
        const existingView = await View.findOne({ userID: userId, projectId });

        if (existingView) {
            return res.status(200).json({ message: "User has already viewed this project." });
        }

        // Increment the project's view count
        const project = await Listing.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        project.view += 1;
        await project.save();

        // Add a new view record
        const newView = new View({ userID: userId, projectId });
        await newView.save();

        res.status(200).json({ message: "View count updated successfully.", project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the view count." });
    }
};

const getProject=async(req,res)=>{
  try{
   const {_id}=req.body;

   const project=await Listing.findById(_id);

   if(project){
    return res.json({status:true,project});
   }
   res.json({statu:false,message:'Project Not Found'});
  }catch(err){
    console.log(err.message)
  }
}

const showcase=async(req,res)=>{
  const { show } = req.body;

  try {
    // Update or create the selection in the database
    const updatedShowcase = await Show.findOneAndUpdate(
      {}, // Assuming a single document is managed
      { show },
      { new: true, upsert: true } // Create if not exists
    );
    res.status(200).json({ message: "Showcase updated successfully", data: updatedShowcase });
  } catch (error) {
    console.error("Error updating showcase:", error);
    res.status(500).json({ error: "Failed to update showcase" });
  }
}


const getShowcase=async(req,res)=>{
  try{
     const showcase=await Show.findOne({});

     res.json({status:true,showcase})
  }catch(err){
    console.log(err.message)
  }
}
  module.exports={create,allProjects,update,deleteProject,incrementProjectView,getProject,showcase,getShowcase}