const express = require('express')
const router = express.Router()
const Blogs = require('../Models/addpost')
const multer = require('multer')
const path = require("path")
const Comment = require("../Models/comment")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}` + file.originalname)
    }
  })


  const upload = multer({ storage: storage });


router.get("/addnew-post",(req,res)=>{
    res.render('Addnewblog',{
        user:req.user
    })
})

router.post('/',upload.single("coverImage"),async(req,res)=>{
    const {title,body,} = req.body;
   console.log(req.file);
   await Blogs.create({
        title,
        body,
        coverImage:req.file.filename,
        createdBy:req.user.id
    })
    console.log(req.user.id);
    
    return res.redirect("/")
})

router.get("/:id",async(req,res)=>{
  const userId = req.params.id


try {
 
  const data = await Blogs.findById(userId).populate("createdBy")
  const comments = await Comment.find({blogId:req.params.id}).populate("createdby")
  return res.render("Blog",{
    user:req.user,
    data,
    comments
  }) 
} catch (error) {
  console.log(error);
  
} 
  

})

router.post("/comment/:blogId",async(req,res)=>{
  await Comment.create({
    content:req.body.content,
    blogId:req.params.blogId,
    createdby:req.user.id.username
  })
  return res.redirect(`/blog/${req.params.blogId}`)
})
module.exports=router