const SearchBar = ({ value, onChange }) => {
  return (
    <form className="search-form" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search chicken meals..."
        aria-label="Search chicken meals"
      />
    </form>
  )
}

export default SearchBar
