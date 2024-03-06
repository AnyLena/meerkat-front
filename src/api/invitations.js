import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER;

export const getMyInvitations = async (token, setInvitations) => {
  try {
    const response = await axios.get(`${SERVER}/invitations/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "My invitations");
    setInvitations(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getMyFriendRequests = async (token, setInvitations) => {
  try {
    const response = await axios.get(`${SERVER}/invitations/friendship`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "My friend requests");
    setInvitations(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const updateInvitation = async (
  invitationId,
  answer,
  token,
  setInvitations
) => {
  try {
    const response = await axios.put(
      `${SERVER}/invitations/${invitationId}`,
      { status: answer },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "ACCEPTED");
    setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
  } catch (error) {
    console.error(error);
  }
};

export const acceptInvitation = async (invitationId, token, setInvitations) => {
  try {
    const response = await axios.put(
      `${SERVER}/invitations/${invitationId}`,
      { status: "accepted" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "ACCEPTED");

    setInvitations((prev) =>
      prev.map((invitation) =>
        invitation._id === invitationId
          ? { ...invitation, status: "accepted" }
          : invitation
      )
    );
  } catch (error) {
    console.error(error);
  }
};

export const rejectInvitation = async (invitationId, token, setInvitations) => {
  try {
    const response = await axios.put(
      `${SERVER}/invitations/${invitationId}`,
      { status: "rejected" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data, "REJECTED");
    setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvitation = async (invitationId, token, setInvitations) => {
  try {
    const response = await axios.delete(`${SERVER}/invitations/${invitationId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data, "DELETED");
    setInvitations((prev) => prev.filter((inv) => inv._id !== invitationId));
  } catch (error) {
    console.error(error);
  }
}