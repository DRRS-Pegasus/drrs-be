import { Router } from "express";

import { reservationReminderEmail, autoCancellation } from "../controllers/functionController.js";

const router = Router();

router.post("/email", reservationReminderEmail);

router.post("/autoCancel", autoCancellation);

export { router };