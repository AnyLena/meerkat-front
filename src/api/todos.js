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

export const editTodo = async (eventId, currentTodo, token, setEventData) => {
  const todoId = currentTodo._id;
  try {
    const response = await axios.put(
      `${SERVER}/events/${eventId}/todos/${todoId}/edit`, currentTodo, 
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


export const deleteTodo = async (eventId, todoId, token, setEventData) => {
  try {
    const response = await axios.delete(
      `${SERVER}/events/${eventId}/todos/${todoId}`,
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