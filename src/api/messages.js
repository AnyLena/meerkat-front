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
    setMessages(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (eventId, message, token, setMessages) => {
  try {
    const response = await axios.post(
      `${SERVER}/messages/${eventId}`,
      message,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setMessages((prevMessages) => [...prevMessages, response.data]);
  } catch (error) {
    console.error(error);
  }
};

export const getUnreadMessagesNumber = async (
  setUnreadMessages,
  token,
  eventId
) => {
  try {
    const response = await axios.get(`${SERVER}/messages/${eventId}/unread`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUnreadMessages(response.data.unreadMessages);
  } catch (error) {
    console.error(error);
  }
};

export const markMessagesAsRead = async (setUnreadMessages, eventId, token) => {
  try {
    await axios.put(
      `${SERVER}/messages/${eventId}/read`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUnreadMessages(0);
  } catch (error) {
    console.error(error);
  }
};
