const SearchBar = ({handleSearch, setSearchQuery, searchQuery}) => {
  return (
    <div className="search-bar">
    <form onSubmit={handleSearch}>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        type="text"
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
    </div>
  );
};

export default SearchBar;
