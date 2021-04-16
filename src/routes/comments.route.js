const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments.controller");

router.get("/", commentsController.getComments);

router.get("/:song_id", commentsController.getCommentById);

router.post("/", commentsController.createComment);

router.put("/:song_id", commentsController.updateCommentById);

module.exports = router;
