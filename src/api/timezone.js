import axios from "axios";
const KEY = import.meta.env.VITE_TIMEZONE_API_KEY;

export const getTimezone = async (lat,lng,setTimezone) => {
    try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${KEY}`
        );
        // console.log(response.data.features[0].properties.timezone)
        setTimezone(response.data.features[0].properties.timezone)
      } catch (error) {
        console.error(error);
      }
}

