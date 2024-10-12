import { pool } from "../config/database.js";

const getEvents = async (req, res) => {
    try {
        // Query to get all events
        const result = await pool.query('SELECT * FROM events ORDER BY id ASC')

        // Map through the result rows and transform each event
        const formattedEvents = result.rows.map(event => ({
            id: event.id,
            location: event.location,
            title: event.title,
            time: event.time,
            image: event.image,
            date: event.date,
            remaining: {
                years: event.remaining_years,
                months: event.remaining_months,
                days: event.remaining_days
            }
        }))

        // Respond with the transformed events
        res.status(200).json(formattedEvents)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId
        const selectQuery = `
            SELECT location, title, time, image, date, remaining_years, remaining_months, remaining_days
            FROM events
            WHERE id = $1
        `

        // Use parameterized queries to prevent SQL injection
        const results = await pool.query(selectQuery, [eventId])

        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }

        const event = results.rows[0]

        // Construct the 'remaining' object from the individual fields
        const formattedEvent = {
            location: event.location,
            title: event.title,
            time: event.time,
            image: event.image,
            date: event.date,
            remaining: {
                years: event.remaining_years,
                months: event.remaining_months,
                days: event.remaining_days
            }
        }

        res.status(200).json(formattedEvent)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


export default {  getEvents, getEventById  }