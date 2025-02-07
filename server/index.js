const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
const cloudinary = require("cloudinary")
const adminAuthRoute = require("./routes/adminAuthRoute");
const projectRoute=require("./routes/projectRoute");
const UserRoute=require("./routes/userRoute");
const WishlistRoute=require("./routes/wishlistRoute");
const MessageRoute=require("./routes/messageRoute")
require("dotenv").config();
app.use(bodyParser.json({ limit: "50mb" })); // Replace "50mb" with your required limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());

// app.use(bodyParser.json({ limit: "Infinity" }));
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


// Routes Start
app.get("/",()=>{
  console.log("hel")
})
app.use("/api/v1/admin-auth", adminAuthRoute);
app.use("/api/v1/projects",projectRoute);
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/wishlist",WishlistRoute);
app.use("/api/v1/msg",MessageRoute);

app.get("/", (req, res)=>{
  return res.send({success:true, message:"Server is running fine"})
})

//Routes End
const port = process.env.PORT;
const connectDb = async () => {
    try {
      await mongoose.connect(`${process.env.MONGO_URI}`);
      console.log("mongoose connection successfull");
    } catch (error) {
      console.log(error);
    }
  };
  
  connectDb()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("Error",err.message);
    })