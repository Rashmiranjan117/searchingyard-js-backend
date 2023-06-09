var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PostModel } = require("../models/link.model");

exports.getAll = async (req, res) => {
  try {
    let data = await PostModel.find();
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data from Server", err });
  }
};

exports.getOne = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await PostModel.find({ _id: id });
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data from Server", err });
  }
};

exports.post = async (req, res) => {
  let data = req.body;
  try {
    let p = new PostModel(data);
    await p.save();
    res.send({ msg: "Post Successfull" });
  } catch (err) {
    res.send({ msg: "Error while posting.", err });
  }
};

exports.patch = async (req, res) => {
  let data = req.body;
  let id = req.params.id;

  try {
    await PostModel.findByIdAndUpdate({ _id: id }, data);
    res.send({ msg: "Update Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Delete Successfull" });
  } catch (err) {
    res.send({ msg: "Error while Updating.", err });
  }
};
