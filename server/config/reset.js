import { pool } from "./database.js";
import "../config/dotenv.js";
import eventData from "../data/eventData.js";
import locationData from "../data/locationData.js";

const createEventTable = async () => {
  const createTableQuery = `
      DROP TABLE IF EXISTS events;
  
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        location VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        time VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        date DATE NOT NULL,
        remaining_years INT NOT NULL DEFAULT 0,
        remaining_months INT NOT NULL DEFAULT 0,
        remaining_days INT NOT NULL DEFAULT 0
      );
    `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 events table created successfully");
  } catch (err) {
    console.error("⚠️ error creating events table", err);
  }
};

const seedEventsTable = async () => {
  await createEventTable();

  eventData.forEach((event) => {
    const insertQuery = {
      text: "INSERT INTO events (location, title, time, date, image, remaining_years, remaining_months, remaining_days) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    };

    const values = [
      event.location,
      event.title,
      event.time,
      event.date,
      event.image,
      event.remaining.years || 0, // Default to 0 if undefined or null
      event.remaining.months || 0, // Default to 0 if undefined or null
      event.remaining.days || 0, // Default to 0 if undefined or null
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event", err);
        return;
      }
      console.log(`✅ ${event.title} added successfully`);
    });
  });
};

seedEventsTable();

const createLocationTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations;

  CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(10) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    image TEXT NOT NULL
);

  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 locations table created successfully");
  } catch (err) {
    console.error("⚠️ error creating locations table", err);
  }
};

const seedLocationsTable = async () => {
  await createLocationTable();

  locationData.forEach((location) => {
    const insertQuery = {
      text: "INSERT INTO locations (name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6)",
    };

    const values = [
      location.name,
      location.address,
      location.city,
      location.state,
      location.zip,
      location.image,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting location", err);
        return;
      }
      console.log(`✅ ${location.name} added successfully`);
    });
  });
};

seedLocationsTable();

const createEventLocationTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS event_location;

    CREATE TABLE IF NOT EXISTS event_location (
      id SERIAL PRIMARY KEY,
      event_id INT NOT NULL,
      location_id INT NOT NULL,
      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (location_id) REFERENCES locations(id)
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 event_location table created successfully");
  } catch (err) {
    console.error("⚠️ error creating event_location table", err);
  }
};

// Seed the 'event_location' table
const seedEventLocationTable = async () => {
  await createEventLocationTable();

  // Create the mapping between events and locations
  eventData.forEach((event, index) => {
    const insertQuery = {
      text: "INSERT INTO event_location (event_id, location_id) VALUES ($1, $2)",
    };

    const values = [event.id, event.location]; // event.id and location id

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting event-location mapping", err);
        return;
      }
      console.log(`✅ Mapping for Event ID: ${event.id} added successfully`);
    });
  });
};

seedEventLocationTable();
