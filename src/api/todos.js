import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

export const addTodo = async (eventId, formData, token, setEventData) => {
  try {
    const response = await axios.post(
      `${SERVER}/events/${eventId}/todos/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEventData((prev) => ({ ...prev, todos: response.data }));
  } catch (error) {
    console.error(error);
  }
};

export const toggleTodo = async (
  eventId,
  todoId,
  token,
  formData,
  setEventData
) => {
  try {
    const response = await axios.put(
      `${SERVER}/events/${eventId}/todos/${todoId}/toggle`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEventData((prev) => ({ ...prev, todos: response.data }));
  } catch (error) {
    console.error(error);
  }
};
