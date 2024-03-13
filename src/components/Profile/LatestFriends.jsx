import { getUserNames, removeContact } from "../../api/users";
import { useState, useEffect } from "react";

const LatestFriends = ({ user, token, setUser }) => {
  const [names, setNames] = useState([]);
  const [selected, setSelected] = useState("");

  const handleSelect = (name) => {
    if (selected === name) {
      setSelected("");
      return;
    }
    setSelected(name);
    console.log(selected);
  };

  const handleRemove = (id) => {
    removeContact(id, user._id, token, setUser);
  };

  useEffect(() => {
    const arrayOfIds = user.contacts;
    getUserNames(arrayOfIds, token, setNames);
  }, [user]);

  return (
    <div className="latest-friends">
      <h2 className="event-heading">Latest friends</h2>
      <section>
        <div
          className="friend-container"
          style={{
            overflowX:"scroll",
            scrollbarWidth: "thin", // for Firefox
            scrollbarColor: "var(--primary color) var(--secondary-color)", // for Firefox
            "&::WebkitScrollbar": {
              // for Chrome, Safari and Edge
              width: "12px",
            },
            "&::WebkitScrollbarTrack": {
              // for Chrome, Safari and Edge
              background: "var(--secondary-color)",
            },
            "&::WebkitScrollbarThumb": {
              // for Chrome, Safari and Edge
              background: "var(--primary-color)",
            },
          }}
        >
          {names.length > 0 ? (
            names.map((name) => {
              return (
                <div
                  onClick={() => handleSelect(name)}
                  className="friend"
                  key={name._id}
                >
                  <img src={name.picture.url} alt="" />
                  <p>{name.name}</p>
                  {selected === name ? (
                    <button onClick={() => handleRemove(name._id)}>
                      remove
                    </button>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div>No friends yet</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LatestFriends;
// export const getUserNames = async (contacts, token, setNames) => {
//   try {
//     const response = await axios.get(`${SERVER}/users/names`, {
//       params: {
//         arrayOfIds: contacts,
//       },
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setNames(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
