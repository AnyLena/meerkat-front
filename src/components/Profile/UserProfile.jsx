import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ProfileSelectorModal from "./ProfileSelectorModal";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { editUser } from "../../api/users";

const UserProfile = ({ user, setUser, token }) => {
  const { name, email, contacts, picture } = user;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const ref = useRef();

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = () => {
    editUser(user._id, token, { name: newName }, setUser);
    setEdit(!edit);
  };

  useEffect(() => {
    if (edit) {
      ref.current.focus();
      ref.current.select();
    }
  }, [edit]);

  return (
    <>
      <motion.div
        className="profile-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="profile-image" onClick={handleOpenModal}>
          <img src={picture.url} alt={name} />
        </div>

        <div className="profile-details">
          <div className="name-edit">
            {!edit && (
              <>
                <h2>{name}</h2>

                <button onClick={() => setEdit(!edit)} className="edit-btn">
                  <FaPencilAlt />
                </button>
              </>
            )}
            {edit && (
              <>
                <input
                  ref={ref}
                  type="text"
                  value={newName}
                  onChange={handleChange}
                />
                <button onClick={handleSave} className="btn-green">
                  <IoIosCheckmark />
                </button>
                <button onClick={() => setEdit(!edit)} className="btn-red">
                  <IoIosClose />
                </button>
              </>
            )}
          </div>
          <p>{email}</p>
          <div className="separator"></div>
          <h3>{contacts.length}</h3>
          <p>{contacts.length === 1 ? "friend" : "friends"}</p>
        </div>
      </motion.div>
      {open && (
        <ProfileSelectorModal
          open={open}
          setOpen={setOpen}
          setUser={setUser}
          user={user}
          token={token}
        />
      )}
    </>
  );
};

export default UserProfile;
