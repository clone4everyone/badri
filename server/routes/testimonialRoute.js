const router=require("express").Router();

const {add,allTestimonial,deleteTestimonial,edit}=require("../controllers/TestimonialController");

router.post("/add",add);
router.get("/getAll",allTestimonial);
router.post("/deleteTestimonial",deleteTestimonial)
router.post("/edit",edit);
module.exports=router;
