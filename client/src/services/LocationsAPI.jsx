const API_BASE_URL = "http://localhost:3000/api";

const getAllLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

const getLocationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/locations/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching location ${id}:`, error);
    return null;
  }
};

const LocationsAPI = {
  getAllLocations,
  getLocationById,
};

export default LocationsAPI;
