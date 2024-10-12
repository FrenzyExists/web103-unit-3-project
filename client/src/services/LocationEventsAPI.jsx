// LocationEventsAPI.js

const LocationEventsAPI = {
  // Fetch events related to a specific location ID
  getEventsByLocationId: async (locationId) => {
    try {
      const response = await fetch(`http://localhost:3000/event_locations`);
      const result = await response.json();
      const filteredEvents = result.filter(
        (item) => item.location_id === locationId
      );
      return filteredEvents;
    } catch (err) {
      console.error("Error fetching location events:", err);
    }
  },
};

export default LocationEventsAPI;
