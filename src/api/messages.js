import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export const fetchMessages = async (eventId, token, setMessages) => {
  try {
    const response = await axios.get(`${SERVER}/messages/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    setMessages(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (eventId, message, token, setMessages) => {
  try {
    const response = await axios.post(
      `${SERVER}/messages/${eventId}`,
      { message },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    setMessages((prevMessages) => [...prevMessages, response.data]);
  } catch (error) {
    console.error(error);
  }
};
