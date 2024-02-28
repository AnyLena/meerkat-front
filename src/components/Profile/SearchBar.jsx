const SearchBar = ({handleSearch, setSearch, search}) => {
  return (
    <div className="search-bar">
    <form onSubmit={handleSearch}>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
    </div>
  );
};

export default SearchBar;
