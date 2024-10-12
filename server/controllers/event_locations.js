import { pool } from "../config/database.js";

// Get all event-location mappings
const getEventLocations = async (req, res) => {
    try {
        // Query to get all event-location mappings
        const result = await pool.query('SELECT * FROM event_location ORDER BY id ASC');

        // Map through the result rows and return the event-location mappings
        const formattedEventLocations = result.rows.map(eventLocation => ({
            id: eventLocation.id,
            event_id: eventLocation.event_id,
            location_id: eventLocation.location_id
        }));

        // Respond with the formatted event-location mappings
        res.status(200).json(formattedEventLocations);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific event-location mapping by ID
const getEventLocationById = async (req, res) => {
    try {
        const {eventLocationId} = req.params;
        const selectQuery = `
            SELECT id, event_id, location_id
            FROM event_location
            WHERE id = $1
        `;

        // Use parameterized queries to prevent SQL injection
        const results = await pool.query(selectQuery, [eventLocationId]);

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event-location mapping not found' });
        }

        const eventLocation = results.rows[0];

        // Respond with the specific event-location mapping
        res.status(200).json({
            id: eventLocation.id,
            event_id: eventLocation.event_id,
            location_id: eventLocation.location_id
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Export the controller functions
export default { getEventLocations, getEventLocationById };
