const express = require("express");
const blogController = require("../controllers/blog");

const {verify} = require("../auth");


const router = express.Router();

router.post("/addBlog", verify, blogController.addBlog);
router.get("/getBlog", verify, blogController.getBlog);
router.get("/getBlog/:blogId", verify, blogController.getBlogById);
router.get("/getUserBlog/", verify, blogController.getUserBlog);
router.put("/updateBlog/:blogId", verify, blogController.updateBlog);
router.delete("/deleteBlog/:blogId", verify, blogController.deleteBlog);
router.patch("/addComment/:blogId", verify, blogController.addComment);
router.get("/getComments/:blogId", verify, blogController.getComments);
router.delete("/deleteComment/:blogId/:commentId", verify, blogController.deleteComment);

module.exports = router;