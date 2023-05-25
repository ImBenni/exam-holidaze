import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VenueList from "../../Components/Venue/VenueList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useVenue } from "../../Hooks/useFetch";
import styles from "./Venues.module.scss";
import { LinearProgress } from "@mui/material";

function Venue() {

  const [venues, isLoading] = useVenue(0, 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedVenues, setSortedVenues] = useState([]);

  useEffect(() => {
    setSortedVenues(venues);
  }, [venues]);

  const filteredVenues = sortedVenues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));


  if (isLoading) {
    return (
      <section className={styles.pageBody}>
        <LinearProgress color="secondary" />
      </section>
    );
  }

  return (
    <>
      <section className={styles.pageBody}>
        <SearchBar
          onSearch={(query) => setSearchQuery(query)}
          venues={venues}
          setVenues={setSortedVenues}
          initialSortType="recentlyCreated"
        />
        <div className={styles.venueList} name="venueList">
          {filteredVenues.map((venue) => (
            <Link to={`/venues/${venue.id}`} key={venue.id} name="venueCard">
              <VenueList venue={venue} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Venue;
