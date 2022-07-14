const SearchBar = ({ handleChange }) => {
  return (
    <div className="searchbar">
      <input placeholder="Search" onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
