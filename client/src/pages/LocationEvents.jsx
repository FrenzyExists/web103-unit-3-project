import React, { useState, useEffect } from "react";
import Event from "../components/Event";
import LocationsAPI from "../services/LocationsAPI";
import EventsAPI from "../services/EventsAPI";
import LocationEventsAPI from "../services/LocationEventsAPI";
import "../css/LocationEvents.css";

// Helper function to normalize location names into slugs
const createSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "") // Remove special characters
    .replace(/\s+/g, ""); // Remove all spaces
};

const LocationEvents = () => {
  // Get the last part of the URL as the location slug
  const locationName = window.location.pathname.split("/").pop().toLowerCase();
  const [location, setLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all locations
        const locations = await LocationsAPI.getAllLocations();

        // Find the location matching the URL slug
        const selectedLocation = locations.find((location) => {
          console.log(location);

          const locationSlug = createSlug(location.name);
          console.log(`location slug: ${locationSlug}`);

          return locationSlug.includes(locationName);
        });

        if (!selectedLocation) {
          console.error("No matching location found.");
          return;
        }

        // Fetch events related to the selected location
        const eventsData = await EventsAPI.getAllEvents();

        const locationEventsData =
          await LocationEventsAPI.getEventsByLocationId(selectedLocation.id);
        console.log(locationEventsData);
        const locationEvents = eventsData.filter((e) => {
          return parseInt(e.location) === selectedLocation.id;
        });
        console.log(locationEvents);

        // console.log(locationEvents);
        console.log(eventsData);

        // Set state with the matching location and its events
        setLocation(selectedLocation);
        setEvents(locationEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [locationName]);

  // If no location is found, return a message
  if (!location) {
    return <h2>Location not found.</h2>;
  }

  return (
    <div className="location-events">
      <header>
        <div className="location-image">
          <img src={location.image} alt={location.name} />
        </div>

        <div className="location-info">
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>
        </div>
      </header>

      <main>
        {events && events.length > 0 ? (
          events.map((event) => (
            <Event
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              image={event.image}
            />
          ))
        ) : (
          <h2>
            <i className="fa-regular fa-calendar-xmark fa-shake"></i>{" "}
            {"No events scheduled at this location yet!"}
          </h2>
        )}
      </main>
    </div>
  );
};

export default LocationEvents;
