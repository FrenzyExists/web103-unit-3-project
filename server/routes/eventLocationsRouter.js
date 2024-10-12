import express from "express";
import EventsLocationController from "../controllers/event_locations.js";

const eventLocationsRouter = express.Router();

eventLocationsRouter.get("/", EventsLocationController.getEventLocations);

eventLocationsRouter.get(
  "/:eventLocationId",
  EventsLocationController.getEventLocationById
);

export default eventLocationsRouter;
