import { IoIosClose } from "react-icons/io";
import { deleteInvitation, acceptInvitation } from "../../api/invitations";

const FriendshipRequests = ({
  invitations,
  setInvitations,
  user,
  token,
  setUser,
}) => {
  const handleDeleteRequest = (id) => {
    deleteInvitation(id, token, setInvitations);
  };

  const handleAccept = (id) => {
    acceptInvitation(id, token, setInvitations);
    const newFriend = invitations.find((i) => i._id === id).inviting;
    setUser((prev) => ({
      ...prev,
      contacts: [...prev.contacts, newFriend._id],
    }));
  };

  const handleReject = (id) => {
    deleteInvitation(id, token, setInvitations);
  };

  return (
    <>
      {invitations.find((inv) => inv.status === "pending") && (
        <div className="friendship-requests">
          <h2 className="event-heading">Friendship Requests</h2>
          {invitations.find(
            (i) => i.inviting._id === user._id && i.status === "pending"
          ) && (
            <>
              <label>sent requests</label>
              {invitations.map(
                (inv) =>
                  inv.inviting._id === user._id &&
                  inv.status === "pending" && (
                    <div className="invitation" key={inv._id}>
                      <img src={inv.invited.picture?.url} alt="" />
                      <p>{inv.invited.name}</p>
                      <button
                        onClick={() => handleDeleteRequest(inv._id)}
                        className="btn-close"
                      >
                        <IoIosClose />
                      </button>
                    </div>
                  )
              )}
            </>
          )}
          {invitations.find(
            (i) => i.invited._id === user._id && i.status === "pending"
          ) && (
            <>
              <label>received requests</label>
              {invitations.map(
                (inv) =>
                  inv.invited._id === user._id &&
                  inv.status === "pending" && (
                    <div className="invitation" key={inv._id}>
                      <img src={inv.inviting.picture.url} alt="" />
                      <p>{inv.inviting.name}</p>
                      <div className="buttons">
                        <button
                          className="btn-green"
                          onClick={() => {
                            handleAccept(inv._id);
                          }}
                        >
                          accept
                        </button>
                        <button
                          className="btn-red"
                          onClick={() => {
                            handleReject(inv._id);
                          }}
                        >
                          decline
                        </button>
                      </div>
                    </div>
                  )
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FriendshipRequests;
