const express = require("express");
const router = express.Router();
const mvController = require("../controllers/mv.controller");

router.get("/:id", mvController.getMVByID);

module.exports = router;
