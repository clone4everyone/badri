const router=require('express').Router();

const {postWishlist,getWishlist,getAll}=require('../controllers/wishlistController');

router.get('/getWishlist',getWishlist);
router.post("/postWishlist",postWishlist);
router.get("/getAll/:userId",getAll)
module.exports=router