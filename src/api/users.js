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
    setSearchResults(response.data);
  } catch (error) {
    console.log(error);
  }
};

// export const addContact = async (contactId, userId, token, setUser) => {
//   try {
//     const response = await axios.put(
//       `${SERVER}/users/${userId}/contacts/add`,
//       { contact: contactId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     setUser(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const sendFriendshipRequest = async (
  contactId,
  token,
  setInvitations
) => {
  try {
    const response = await axios.post(
      `${SERVER}/invitations/friendship`,
      { invited: contactId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInvitations((prev) => [...prev, response.data]);
  } catch (error) {
    console.log(error);
  }
};

export const removeContact = async (contactId, userId, token, setUser) => {
  try {
    const response = await axios.put(
      `${SERVER}/users/${userId}/contacts/remove`,
      { contact: contactId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUser(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getUserNames = async (contacts, token, setNames) => {
  try {
    const response = await axios.get(`${SERVER}/users/names`, {
      params: {
        arrayOfIds: contacts,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setNames(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const decryptToken = async (token, setDecryptedToken) => {
  try {
    const response = await axios.post(`${SERVER}/users/decrypt-token`, {
      token,
    });
    setDecryptedToken(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const completeRegistration = async (userData, id) => {
  console.log(userData, id);
  try {
    const response = await axios.put(
      `${SERVER}/users/complete-registration/${id}`,
      userData
    );
  } catch (error) {
    console.error(error);
  }
};
