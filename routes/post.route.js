const express = require("express");
var jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");
const { PostModel } = require("../models/link.model");
const postController = require("../controller/post.controller");
const postRouter = express.Router();

const { authenticate } = require("../middlewares/authenticate.middleware");

postRouter.get("/", authenticate, postController.getAll);

postRouter.get("/:id", authenticate, postController.getOne);

postRouter.post("/", authenticate, postController.post);

postRouter.patch("/:id", authenticate, postController.patch);

postRouter.delete("/:id", authenticate, postController.delete);

module.exports = { postRouter };
