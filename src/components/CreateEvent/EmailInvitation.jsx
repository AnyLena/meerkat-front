import { IoIosClose } from "react-icons/io";

const EmailInvitation = ({ emailInvitations, setEmailInvitations }) => {
  const handleAddEmail = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    if (emailInvitations.includes(email)) return;
    setEmailInvitations([...emailInvitations, email]);
    e.target[0].value = "";
    console.log(emailInvitations);
  };

  return (
    <div className="email-invitation">
      <label className="form-step-label">
        <p>Invite by email</p>
      </label>
      <div className="email-invitation-container">
        <form onSubmit={handleAddEmail}>
          <input type="email" placeholder="Email" />
          <button type="submit">Invite</button>
        </form>
      </div>
      <div className="email-invitations">
        {emailInvitations.length > 0 &&
          emailInvitations.map((email) => (
            <div key={email} className="email-invitation-item">
              <p>{email}</p>
              <button
                onClick={() =>
                  setEmailInvitations(
                    emailInvitations.filter(
                      (invitation) => invitation !== email
                    )
                  )
                }
              >
                <IoIosClose className="close-btn" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EmailInvitation;
