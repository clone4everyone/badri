const router=require("express").Router();

const {putMsg,getMsg}=require("../controllers/messageController");
router.post("/putMsg",putMsg);
router.get("/getmsg",getMsg)
module.exports =router