import express from "express";
import { contactUs, subscribe } from "../controller/common.controller.js";

const router = express.Router();

// Import the necessary modules here
router.route("/contact-us").post(contactUs);

router.route("/subscribe").post(subscribe);

export default router;