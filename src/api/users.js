import axios from "axios";
const SERVER = import.meta.env.VITE_SERVER;

export const createUser = async (
  userData,
  setLoading,
  setMessage,
  setErrorMessage,
  setShowLogin
) => {
  try {
    const response = await axios.post(`${SERVER}/users/`, userData);
    setMessage("User created successfully.");
    setTimeout(() => {
      setShowLogin(true);
    }, 3000);
  } catch (error) {
    setErrorMessage(error.response.data.message);
    console.log(error.response.data.message);
  } finally {
    setLoading(false);
  }
};

export const searchUsers = async (searchQuery, token, setSearchResults) => {
  try {
    const response = await axios.get(`${SERVER}/users/all?q=${searchQuery}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    setSearchResults(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const addContact = async (contactId, userId, token) => {
  try {
    const response = await axios.put(
      `${SERVER}/users/${userId}/contacts/add`,
      { contact: contactId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};