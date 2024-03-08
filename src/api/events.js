import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

export const createEvent = async (
  formData,
  user,
  token,
  invitations,
  setInvitations,
  emailInvitations
) => {
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
    location: {
      description: formData.location,
      map: formData.map,
      lat: formData.position?.lat,
      lng: formData.position?.lng,
    },
    participants: formData.participants,
    picture: formData.image,
    owner: user._id,
  };

  try {
    const response = await axios.post(`${SERVER}/events`, data);
    const eventId = response.data._id;
    if (invitations.length > 0) {
      invitations.forEach((invited) => {
        inviteParticipant(invited, token, eventId, setInvitations);
      });
    }
    if (emailInvitations.length > 0) {
      emailInvitations.forEach((email) => {
        emailInvitation(email, eventId, token);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserEvents = async (setUserEvents, token) => {
  try {
    const response = await axios.get(`${SERVER}/events`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setUserEvents(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const getEvent = async (
  eventId,
  token,
  setEventData,
  setLoading,
  setBackgroundImage
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${SERVER}/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setEventData(response.data);
    setBackgroundImage(response.data.picture.url);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const removeParticipant = async (
  participantId,
  token,
  eventId,
  setEventData
) => {
  try {
    const response = await axios.put(
      `${SERVER}/events/${eventId}/participants/remove`,
      { participant: participantId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("participants", response.data);
    setEventData((prev) => ({ ...prev, participants: response.data }));
  } catch (error) {
    console.log(error);
  }
};
export const getInvitations = async (eventId, token, setInvitations) => {
  try {
    const response = await axios.get(`${SERVER}/invitations/event/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "INVITED");
    setInvitations(response.data);
  } catch (error) {
    console.error(error);
  }
};

// export const addParticipant = async (
//   participantId,
//   token,
//   eventId,
//   setEventData
// ) => {
//   console.log("addParticipant", participantId, token, eventId);
//   try {
//     const response = await axios.put(
//       `${SERVER}/events/${eventId}/participants/add`,
//       { participant: participantId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("participants", response.data);
//     setEventData((prev) => ({ ...prev, participants: response.data }));
//   } catch (error) {
//     console.log(error);
//   }
// };

export const inviteParticipant = async (
  participantId,
  token,
  eventId,
  setInvitations
) => {
  try {
    const response = await axios.post(
      `${SERVER}/invitations/event/${eventId}`,
      {
        invited: participantId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    setInvitations((prev) => [...prev, response.data]);
  } catch (error) {
    console.error(error);
  }
};

export const emailInvitation = async (email, eventId, token) => {
  try {
    const response = await axios.post(
      `${SERVER}/users/invite/${eventId}`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const putEvent = async (eventId, token, data, setEventData) => {
  console.log(data, "PUT EVENT");
  try {
    const response = await axios.put(
      `${SERVER}/events/${eventId}`,
      { data },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setEventData((prev) => ({ ...prev, ...response.data }));
  } catch (error) {
    console.error(error);
  }
};

export const leaveEvent = async (eventId, token) => {
  try {
    const response = await axios.put(
      `${SERVER}/events/${eventId}/participants/leave`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("leave", response.data);
  } catch (error) {
    console.error(error);
  }
}

export const deleteEvent = async (eventId, token) => {
  try {
    const response = await axios.delete(`${SERVER}/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};