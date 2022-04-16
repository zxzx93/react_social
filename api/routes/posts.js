const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt =  require("bcrypt");

//create a post
router.post("/", async (req,res)=>{
  const newPost = new Post(req.body);
  try{ 
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  }catch(err){
    res.status(500).json(err);
  }
})


//update a post
router.put("/:id", async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.updateOne({$set:req.body});
      res.status(200).json("게시물이 업데이트 되었습니다.");
    }else{
      res.status(403).json("본인의 게시물만 수정 가능합니다.");
    }
  }catch(err){
    res.status(500).json(err);
  }
})


//delete a post
router.delete("/:id", async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
      await post.deleteOne();
      res.status(200).json("게시물이 삭제 되었습니다.");
    }else{
      res.status(403).json("본인의 게시물만 삭제 가능합니다.");
    }
  }catch(err){
    res.status(500).json(err);
  }
})


//like / dislike a post
router.put("/:id/like", async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({$push:{likes:req.body.userId}})
      res.status(200).json("좋아요를 눌렀습니다.");
    } else {
      await post.updateOne({$pull:{likes:req.body.userId}})
      res.status(200).json("좋아요를 취소했습니다.");
    }

  } catch (err) {
    res.status(500).json(err);
  }
})


//get a post
router.get("/:id", async (req,res)=>{
  try{
    const post = await Post.findById(req.params.id);
    console.log(post);
    res.status(200).json(post);
  }catch(err){
    res.status(500).json(err);
  }
})


//get timeline posts
router.get("/timeline/:userId", async(req,res)=>{
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({userId:currentUser._id});
    const friendPosts = await Promise.all(currentUser.followings.map((friendId)=>{
     return Post.find({userId:friendId})
    }));
    res.json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
})

//get user's all posts
router.get("/profile/:username", async(req,res)=>{
  try {
   const user= await User.findOne({username:req.params.username});
   const posts= await Post.find({userId:user._id});
   console.log("포스트",posts);
  res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
})



module.exports = router;
