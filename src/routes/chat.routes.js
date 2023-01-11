const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.ontroller");
router.route("/api/v1/chat").post(chatController.createChat);

module.exports = router;
