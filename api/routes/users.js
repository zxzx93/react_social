const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("사용자가 삭제 되었습니다.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("본인의 계정만 삭제가 가능합니다.");
  }
});

//get a users
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updateAt, ...other } = user._doc; //유저 테이블에서 password,updateAt만 빼고 res로 보내줌
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//프로파일 페이지에 친구들 사진, 이름, userId 가져오기
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => User.findById(friendId))
    );

    // 친구들 정보에서 _id, username, profilePicture 만 배열에 담아서 내보냄
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    console.log(req.body.userId, req.params.id);
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId); 

    console.log("user", user);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("팔로우가 되었습니다.");
      } else {
        res.status(403).json("이미 사용자를 팔로우 하셨습니다.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("본인을 팔로우 할 수 없습니다.");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("언팔로우가 되었습니다.");
      } else {
        res.status(403).json("이미 사용자를 언팔로우 하셨습니다.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("본인을 언팔로우 할 수 없습니다.");
  }
});

router.get("/", (req, res) => {
  res.send("user router!!");
});

module.exports = router;
