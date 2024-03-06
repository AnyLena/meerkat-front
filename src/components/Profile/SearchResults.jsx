import React from "react";
import UserCard from "./UserCard";

const SearchResults = ({ searchResults, invitations, setInvitations, setUser }) => {
  return (
    <div className="search-results">
      {searchResults.length > 0
        ? searchResults.map((contact) => (
            <UserCard
              key={contact._id}
              contact={contact}
              invitations={invitations}
              setInvitations={setInvitations}
              setUser={setUser}
            />
          ))
        : null}
    </div>
  );
};
export default SearchResults;
