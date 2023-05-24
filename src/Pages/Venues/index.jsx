import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VenueList from "../../Components/Venue/VenueList";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useVenue } from "../../Hooks/useFetch";
import styles from "./Venues.module.scss";
import { LinearProgress, Button, Box } from "@mui/material";

function Venue() {
  const [limit, setLimit] = useState(50);
  const [venues, isLoading] = useVenue(0, limit);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedVenues, setSortedVenues] = useState([]);

  useEffect(() => {
    setSortedVenues(venues);
  }, [venues]);

  const filteredVenues = sortedVenues.filter((venue) => venue.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const loadMore = () => {
    setLimit((prevLimit) => prevLimit + 50);
  };

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
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Button size="large" variant="contained" onClick={loadMore} sx={{ marginBottom: 6 }}>
            Show More
          </Button>
        </Box>
      </section>
    </>
  );
}

export default Venue;
