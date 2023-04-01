const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // check if the user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password before saving to the database

    const saltPassword = await bycrypt.genSalt(10);
    const securePassword = await bycrypt.hash(req.body.password, saltPassword);

    // create a new user object
    const signedUpUser = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      password: securePassword,
    });

    // save the user to the database
    await signedUpUser.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // Generate JWT and return to client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // Generate JWT and return to client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );

    res.json({ message: "Sign in successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
