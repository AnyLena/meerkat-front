import axios from "axios";

export const createEvent = async (formData, user) => {
  const SERVER = import.meta.env.VITE_SERVER;
  const date = new Date(formData.date);
  const time = new Date(formData.time);
  const dateTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.getHours(),
    time.getMinutes()
  );
  const data = {
    title: formData.title,
    description: formData.description,
    date: { start: dateTime, end: "" },
    location: { description: formData.location, lat: 0, long: 0 },
    participants: formData.participants,
    picture: formData.image,
    owner: user.user._id,
  };

  try {
    const response = await axios.post(`${SERVER}/events`, data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
