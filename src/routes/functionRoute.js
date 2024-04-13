const express = require("express");

const {
    reservationReminderEmail
} = require("../controllers/functionController");

const router = express.Router();

router.post("/email", reservationReminderEmail);

module.exports = router;