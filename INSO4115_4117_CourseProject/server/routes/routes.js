const express = require("express");
const router = express.Router();
const signUpTemplateCopy = require("../models/SignUpModels");
const bycrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const saltPassword = await bycrypt.genSalt(10);
  const securePassword = await bycrypt.hash(req.body.password, saltPassword);

  const signedUpUser = new signUpTemplateCopy({
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: securePassword,
  });
  signedUpUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
