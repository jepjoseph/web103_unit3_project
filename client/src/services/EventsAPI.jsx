const API_BASE_URL = "http://localhost:3000/api";

const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    return null;
  }
};

const getEventsByLocationId = async (locationId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/locations/${locationId}/events`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching events for location ${locationId}:`, error);
    return [];
  }
};

const EventsAPI = {
  getAllEvents,
  getEventById,
  getEventsByLocationId,
};

export default EventsAPI;
