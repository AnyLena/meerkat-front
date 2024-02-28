import axios from "axios";

export const createUser = async (
  userData,
  setLoading,
  setMessage,
  setErrorMessage,
  setShowLogin
) => {
  const SERVER = import.meta.env.VITE_SERVER;
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
