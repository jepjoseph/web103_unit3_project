import express from "express";
import {
  getAllEvents,
  getEventById,
  getEventsByLocationId,
} from "../controllers/events.js";

const router = express.Router();

router.get("/events", getAllEvents);
router.get("/events/:id", getEventById);
router.get("/locations/:id/events", getEventsByLocationId);

export default router;
