const router=require('express').Router();

const {create,allProjects,update,deleteProject,incrementProjectView,getProject,showcase,getShowcase}=require("../controllers/projectController");


router.post('/create',create);
router.get('/getAll',allProjects);
router.post('/update',update);
router.post("/delete",deleteProject)
router.post("/incrementProjectView",incrementProjectView)
router.post("/getProject",getProject);
router.post("/showcase",showcase);
router.get("/getShowcase",getShowcase)
module.exports=router;