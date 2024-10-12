// LocationEventsAPI.js

const LocationEventsAPI = {
    // Fetch events related to a specific location ID
    getEventsByLocationId: async (locationId) => {
        try {
            const response = await fetch(`http://localhost:3000/event_locations/${locationId}`);
            const result = await response.json();
            return result;
        } catch (err) {
            console.error('Error fetching location events:', err);
        }
    }
};

export default LocationEventsAPI;
