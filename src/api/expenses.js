import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export const handleAddExpense = async (eventId, formData, token, setEventData, setSnackBarMessage) => {
    try {
      const response = await axios.put(
        `${SERVER}/events/${eventId}/expenses`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData((prev) => ({ ...prev, expenses: response.data }));
      setSnackBarMessage({
        message: "Item added successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  export const handleDeleteExpense = async (expenseId, eventId, token, setEventData, setSnackBarMessage) => {
    try {
      const response = await axios.delete(
        `${SERVER}/events/${eventId}/expenses/${expenseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEventData((prev) => ({ ...prev, expenses: response.data }));
      setSnackBarMessage({
        message: "Item deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };