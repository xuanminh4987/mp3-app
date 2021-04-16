const express = require("express");
const router = express.Router();
const hubController = require("../controllers/hub.controller");

router.get("/", hubController.getHub);

router.get("/:id", hubController.getHubByID);

module.exports = router;
