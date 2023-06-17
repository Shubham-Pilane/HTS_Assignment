const express = require("express");
const {UserModel} = require("../model/userModel");
const bcrypt = require("bcrypt");

const UserRouter=express.Router()

UserRouter.post("/signup", async (req, res) => {
    const { first_name,last_name, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        res.status(400).json({ msg: "Email already exists" });
      } else {
        bcrypt.hash(password, 5, async (err, hash) => {
          const newUser = new UserModel({first_name,last_name,email,password:hash});
          await newUser.save();
          res.status(200).json({ msg: "New user has been registered" });
        });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
  
  UserRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findOne({email});
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            res.status(200).json({ msg: "Login successful !!"});
          } else {
            res.status(400).json({ msg: "Password Mismatch !!" });
          }
        });
      } else {
        res.status(400).json({ msg: "Please create an account first !!" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });

  module.exports = {UserRouter};