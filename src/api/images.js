import axios from "axios";

export const getProfileImages = async (setImages) => {
  const SERVER = import.meta.env.VITE_SERVER;
  try {
    const response = await axios.get(`${SERVER}/images/profile`);
    setImages(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
