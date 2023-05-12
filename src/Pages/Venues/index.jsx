import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VenueList from "../../Components/Venue/VenueList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SortVenues from "../../Components/Sorting/SortVenues";
import { useFetch } from "../../Hooks/useFetch";
import styles from "./Venues.module.scss";

function Venue() {
  const [venues, isLoading, isError] = useFetch("/venues");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedVenues, setSortedVenues] = useState([]);

  venues.sort((a, b) => new Date(b.created) - new Date(a.created));
  
  useEffect(() => {
    setSortedVenues(venues);
  }, [venues]);

  const filteredVenues = sortedVenues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));

  console.log(venues);

  return (
    <div>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <SortVenues venues={venues} setVenues={setSortedVenues} initialSortType="recentlyCreated" />
      <section className={styles.pageBody}>
        <div className={styles.venueList}>
          {filteredVenues.map((venue) => (
            <Link to={`/venues/${venue.id}`} key={venue.id}>
              <VenueList venue={venue} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Venue;
