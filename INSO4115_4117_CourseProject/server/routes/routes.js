const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/BlackListedTokens");
const restaurants = require("../../src/node/restaurant.json");
const fs = require("fs");

router.post("/signup", async (req, res) => {
  try {
    console.log("Received a request to sign up a user:", req.body);
    const { fullName, email, password } = req.body;

    // check if the user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      console.log("User already exists:", userExists);
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password before saving to the database
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    // create a new user object
    const signedUpUser = new UserModel({
      fullName,
      email,
      password: securePassword,
    });
    console.log("New user object:", signedUpUser);

    // save the user to the database
    await signedUpUser.save();
    console.log("User saved to database:", signedUpUser);

    // Create JWT payload
    const payload = {
      user: {
        id: signedUpUser.id,
        email: signedUpUser.email,
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
        res.status(201).json({ message: "User created successfully", token });
      }
    );
  } catch (err) {
    console.error("Error while signing up user:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log("Received a request to sign in a user:", req.body);
    const { email, password } = req.body;

    // find the user by email
    const user = await UserModel.findOne({ email });
    console.log("User found:", user);
    if (!user) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);
    if (!passwordMatch) {
      console.log("Invalid email or password");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User signed in successfully:", user);

    // Check if token is blacklisted
    const tokenExists = await BlacklistedToken.exists({ token: req.token });
    console.log("Token blacklisted:", tokenExists);
    if (tokenExists) {
      console.log("Token is blacklisted");
      return res.status(401).json({ message: "Unauthorized" });
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
        res.json({ token, message: "Sign in successful" });
      }
    );
  } catch (err) {
    console.error("Error while signing in user:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    console.log("Received a request to get a user:", req.body);

    // extract token from request body
    const token = req.body.token;
    console.log("Token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // verify token and extract user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const userId = decoded.user.id;
    console.log("User ID:", userId);

    // check if token has been blacklisted
    const isTokenBlacklisted = await BlacklistedToken.exists({ token });
    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Token has been blacklisted" });
    }

    // find user by id
    const user = await UserModel.findById(userId).select("-password");
    console.log("User:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // return user's full name and email
    res.json({ fullName: user.fullName, email: user.email });
  } catch (err) {
    console.error("Error while retrieving user:", err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    console.log("Received a request to log out a user:", req.body);

    // extract token from headers
    const token = req.header("x-auth-token");
    console.log("Token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Blacklist token
    const decoded = jwt.decode(token);
    const blacklistedToken = new BlacklistedToken({
      token: token,
      user: decoded.user.id,
      createdAt: new Date(),
    });
    await blacklistedToken.save();

    console.log("Token blacklisted successfully");

    res.json({ message: "User logged out successfully" });
  } catch (err) {
    console.error("Error while logging out user:", err);
    res.status(500).json({ message: err.message });
  }
});
router.post("/add-restaurant", (req, res) => {
  const { name, location } = req.body;
  console.log("Received a request to add a restaurant:", req.body);
  // Generate ID based on the restaurant name
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Load the contents of the restaurants.json file into the restaurants array
  const fileContents = fs.readFileSync("../src/node/restaurant.json", "utf8");
  const restaurants = JSON.parse(fileContents);

  // Check if the restaurant already exists
  if (restaurants.some((r) => r.id === id && r.location === location)) {
    return res.status(409).json({ error: "Restaurant already exists" });
  }

  // Add the new restaurant to the existing restaurants array
  restaurants.push({ id, name, location, reviews: [] });

  // Update the restaurants.json file with the updated restaurants array
  fs.writeFile(
    "../src/node/restaurant.json",
    JSON.stringify(restaurants, null, 2),
    (err) => {
      if (err) throw err;
      return res.json({ success: true });
    }
  );
});
router.post("/get-restaurant", (req, res) => {
  const { id } = req.body;
  console.log("Received a request to get a restaurant:", req.body);

  // Load the contents of the restaurants.json file into the restaurants array
  const fileContents = fs.readFileSync("../src/node/restaurant.json", "utf8");
  const restaurants = JSON.parse(fileContents);

  // Find the restaurant with the specified ID
  const restaurant = restaurants.find((r) => r.id === id);

  // If the restaurant is not found, return a 404 error
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  // Return the restaurant name and location
  return res.json({ name: restaurant.name, location: restaurant.location });
});

router.post("/add-review", (req, res) => {
  const { id, location, rating, review } = req.body;

  // Find the restaurant with the matching id and location
  const restaurant = restaurants.find(
    (r) => r.id === id && r.location === location
  );

  // If the restaurant isn't found, return an error
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }

  // Add the new review to the restaurant's reviews array
  restaurant.reviews.push({ rating, review });

  // Update the restaurants.json file with the new review
  fs.writeFile(
    "../src/node/restaurant.json",
    JSON.stringify(restaurants, null, 2),
    (err) => {
      if (err) throw err;
      return res.json({ success: true });
    }
  );
});

module.exports = router;
