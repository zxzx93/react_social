const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new con
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  console.log("모델 newConversation", newConversation);

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get con of user
router.get("/:userId", async (req, res) => {
  try {
    //members 객체 배열안에 userId가 있는지 찾기
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
