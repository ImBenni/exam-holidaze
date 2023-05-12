import { useState } from "react";
import styles from "./SearchBar.module.scss";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by title or location..."
      />
    </div>
  );
}

export default SearchBar;
