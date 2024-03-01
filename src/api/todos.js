import axios from "axios";

export  const toggleTodo = async (eventId, todoId, token, formData, setEventData) => {
    const SERVER = import.meta.env.VITE_SERVER;
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
      setEventData(response.data);
    } catch (error) {
      console.error(error);
    }
  };