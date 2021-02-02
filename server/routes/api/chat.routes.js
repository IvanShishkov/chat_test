const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const verifyToken = require("../../middleware/verifyJwt");
const Chats = require("../../models/Chats.model");
const Users = require("../../models/Users.model");

router.post("/", verifyToken, async (req, res) => {
  try {
    const newChat = new Chats({
      name: req.body.name,
      creatorId: req.body.userId,
      users: req.body.userId,
      color: req.body.color,
      inviteId: v4(),
    });
    await newChat.save((err, chat) => {
      if (err) return res.status(409).send({ message: "Save error: " + err });
      return res.status(201).send(chat);
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.post("/:chatId/messages", verifyToken, async (req, res) => {
  try {
    const userId = jwt.decode(req.headers.authorization.split(" ")[1]).id;
    const newMessage = {
      senderId: userId,
      senderName: req.body.name,
      text: req.body.text,
    };
    try {
      const chat = await Chats.findOneAndUpdate(
        { _id: req.params.chatId },
        { $push: { messages: newMessage } },
        { new: true }
      );

      return res.status(201).send({
        inChatId: req.params.chatId,
        message: chat.messages[chat.messages.length - 1],
      });
    } catch (error) {
      return res.status(409).send({ message: "Error saving message" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    let allChats;
    if (req.query.userId) {
      allChats = await Chats.find({ users: req.query.userId });
    } else if (req.query.inviteId) {
      allChats = await Chats.findOne({ inviteId: req.query.inviteId });
    } else {
      allChats = await Chats.find();
    }
    return res.status(200).send(allChats);
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.get("/:chatId/users", verifyToken, async (req, res) => {
  try {
    await Chats.findOne({ _id: req.params.chatId }, async (err, chat) => {
      if (err) return res.status(409).send({ message: "Find chat error" });
      await Users.find({ _id: { $in: chat.users } }, "name", (err, users) => {
        if (err) return res.status(409).send({ message: "Find users error" });
        return res.status(200).send(users);
      });
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.delete("/:chatId", verifyToken, async (req, res) => {
  try {
    const userId = jwt.decode(req.headers.authorization.split(" ")[1]).id;
    const chat = await Chats.findById(req.params.chatId);
    if (chat.creatorId !== userId)
      return res
        .status(403)
        .send({ message: "You are not the creator of this chat" });

    await chat.remove();
    return res.status(200).send(chat._id);
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.put("/:chatId/users/:userId", verifyToken, async (req, res) => {
  try {
    const chat = await Chats.findById(req.params.chatId);
    if (chat.users.includes(req.params.userId))
      return res.status(409).send({ message: "You are already in the chat" });

    await chat.users.push(req.params.userId);
    await chat.save();
    return res.status(200).send(chat);
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.delete("/:chatId/users/:userId", verifyToken, async (req, res) => {
  try {
    const chat = await Chats.findById(req.params.chatId);
    await chat.users.pull(req.params.userId);
    await chat.save();
    return res.status(200).send(chat._id);
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

module.exports = router;
