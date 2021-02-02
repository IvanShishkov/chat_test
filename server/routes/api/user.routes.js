const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const verifyToken = require("../../middleware/verifyJwt");
const Users = require("../../models/Users.model");

router.post("/", async (req, res) => {
  const loginExist = await Users.findOne({ name: req.body.name });
  if (loginExist)
    return res.status(400).send({ message: "Login already exists" });

  try {
    const newUser = new Users({
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await newUser.save((err, user) => {
      if (err) return res.status(409).send({ message: "Save error: " + err });

      const token = jwt.sign(
        { id: user._id },
        "7dho8TA5Ax9wMXgHCZrWzj2czAp6C5iH"
      );
      return res.status(201).send({ _id: user._id, name: user.name, token });
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({ name: req.body.name });
    if (!user) return res.status(404).send({ message: "User is not found" });

    let validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id },
      "7dho8TA5Ax9wMXgHCZrWzj2czAp6C5iH"
    );
    return res.status(200).send({ _id: user._id, name: user.name, token });
  } catch (err) {
    return res.status(400).send({ message: "Server error: " + err });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const allUsers = await Users.find();
    return res.status(200).send(allUsers);
  } catch (err) {
    return res.status(500).send({ message: "Server error: " + err });
  }
});

module.exports = router;
