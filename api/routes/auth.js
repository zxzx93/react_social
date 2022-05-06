const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // Validate user input
  if (!username || !email || !password) {
    res.status(404);
    throw new Error("모든 항목을 채워주세요.");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("이미 가입되어 있는 이메일입니다.");
  }

  try {
    //비밀번호 해쉬
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //새로운 유저 생성
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      followers: user.followers,
      followings: user.followings,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    // const { email, password } = req.body;

    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("사용자를 찾을 수 없습니다.");

    const vaildPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !vaildPassword && res.status(400).json("잘못된 비밀번호 입니다.");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h", //1시간
  });
};

module.exports = router;
