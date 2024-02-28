import React from "react";
import UserCard from "./UserCard";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="search-results">
      {searchResults.length > 0
        ? searchResults.map((contact) => (
            <UserCard key={contact._id} contact={contact} />
          ))
        : null}
    </div>
  );
};
export default SearchResults;
