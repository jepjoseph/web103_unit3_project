import { pool } from "../config/database.js";

const getAllEvents = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM events ORDER BY id ASC");

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;

    const results = await pool.query("SELECT * FROM events WHERE id = $1", [
      eventId,
    ]);

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({
      error: error.message,
    });
  }
};

const getEventsByLocationId = async (req, res) => {
  try {
    const locationId = req.params.id;

    const results = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY date ASC, time ASC",
      [locationId],
    );

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({
      error: error.message,
    });
  }
};

export { getAllEvents, getEventById, getEventsByLocationId };
