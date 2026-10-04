import { pool } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

const createTables = async () => {
  const createLocationsTable = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            zip VARCHAR(20) NOT NULL,
            image TEXT
        );
    `;

  const createEventsTable = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            image TEXT,
            location_id INTEGER NOT NULL,
            CONSTRAINT fk_location
                FOREIGN KEY (location_id)
                REFERENCES locations(id)
                ON DELETE CASCADE
        );
    `;

  try {
    await pool.query(createLocationsTable);
    console.log("locations table created successfully");

    await pool.query(createEventsTable);
    console.log("events table created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const seedLocations = async () => {
  const locations = [
    ["Echo Lounge", "100 Unity Way", "Unity City", "FL", "33001", ""],
    ["House of Blues", "200 Unity Way", "Unity City", "FL", "33002", ""],
    ["Pavilion", "300 Unity Way", "Unity City", "FL", "33003", ""],
    ["American Airlines", "400 Unity Way", "Unity City", "FL", "33004", ""],
  ];

  try {
    const result = await pool.query("SELECT COUNT(*) FROM locations");

    if (Number(result.rows[0].count) === 0) {
      for (const location of locations) {
        await pool.query(
          `
                    INSERT INTO locations
                        (name, address, city, state, zip, image)
                    VALUES
                        ($1, $2, $3, $4, $5, $6)
                    `,
          location,
        );
      }

      console.log("locations seeded successfully");
    } else {
      console.log("locations table already contains data; skipping seed");
    }
  } catch (error) {
    console.error("Error seeding locations:", error);
  }
};

const resetDatabase = async () => {
  try {
    await createTables();
    await seedLocations();

    console.log("database setup completed");
  } catch (error) {
    console.error("Database setup failed:", error);
  } finally {
    await pool.end();
  }
};

resetDatabase();
