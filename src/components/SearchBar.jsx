function SearchBar({ value, onChange, onSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search meals..."
        aria-label="Search meals"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
