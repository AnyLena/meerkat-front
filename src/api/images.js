import axios from "axios";

export const getProfileImages = async (setImages) => {
  const SERVER = import.meta.env.VITE_SERVER;
  try {
    const response = await axios.get(`${SERVER}/images/profile`);
    setImages(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getEventImages = async (setImages) => {
  const SERVER = import.meta.env.VITE_SERVER;
  try {
    const response = await axios.get(`${SERVER}/images/event`);
    setImages(response.data);
  } catch (error) {
    console.log(error);
  }
};
