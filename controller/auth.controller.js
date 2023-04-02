const { UserModel } = require("../models/auth.model");
const express = require("express");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  let { credentials, password } = req.body;
  let check = await UserModel.find({ credentials });
  if (check.length > 0) {
    res.send({ msg: "User Already Exists. Try a differnt login Id/Login." });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, securedPassword) => {
        if (err) {
          console.log(err);
          res.send({ msg: "Something went wrong", err });
        } else {
          let user = new UserModel({
            credentials,
            password: securedPassword,
          });
          await user.save();
          // console.log(securedPassword)
          res.send({ msg: "Account Created Successfully!" });
        }
      });
    } catch (err) {
      res.send({ msg: "Something Went wrong while creating account.", err });
    }
  }
};

exports.login = async (req, res) => {
  let { credentials, password } = req.body;
  if (!req.body.credentials) {
    return res
      .send({ error: "Credentials are missing from the request body" });
  }
  let user = await UserModel.find({ credentials });

  if (user.length > 0) {
    try {
      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
        const token = jwt.sign(
          { credentials, password, userId: user[0]._id },
          "secret"
        );
        res.send({ msg: "Login Successfull", token });
      } else {
        res.send({ msg: "Invalid password" });
      }
    } catch (err) {
      res.send({ msg: "Something went wrong", err });
    }
  } else {
    res.send({ msg: "User not found" });
  }
};
