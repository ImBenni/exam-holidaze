import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useFetch } from "../../../Hooks/useFetch";
import styles from "./BigVenue.module.scss";

function PlaceholderCard() {
  return (
    <div className={`${styles.bigVenueCard} ${styles.placeholderCard}`}>
      <div className={`${styles.imgContent} ${styles.placeholderImgContent}`}></div>
    </div>
  );
}

function BigVenueCards() {
  const [venues, isLoading, isError] = useFetch("/venues");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sortedAndFilteredVenues = venues
    .filter((venue) => {
      const img = new Image();
      img.src = venue.media;
      return img.height !== 0 && img.width !== 0;
    })
    .sort((a, b) => b.rating - a.rating || new Date(b.updated) - new Date(a.updated));

  if (isError) {
    return <div className={styles.error}>There was an Error loading data</div>;
  }

  const numCardsToShow = windowWidth < 901 ? 1 : 2;
  const bigVenues = sortedAndFilteredVenues.slice(0, numCardsToShow);

  return (
    <div className={styles.bigVenueCards}>
      {isLoading
        ? Array.from({ length: numCardsToShow }).map((_, idx) => <PlaceholderCard key={idx} />)
        : bigVenues.map((venue) => (
            <Link to={`/venues/${venue.id}`} key={venue.id} className={styles.bigVenueCard}>
              <div className={styles.imgContent}>
                <img src={venue.media} alt={venue.name} className={styles.venueImage} />
                <div className={styles.cardContent}>
                  <div className={styles.titleAndRating}>
                    <h4>{venue.name}</h4>
                    <div className={styles.ratingContent}>
                      <Rating
                        initialValue={venue.rating > 0 ? 1 : 0}
                        size={25}
                        readonly
                        iconsCount={1}
                        fillColor={venue.rating > 0 ? "#21b47e" : "#cccccc"}
                      />
                      <p className={`${styles.ratingText} ${venue.rating > 0 ? styles.hasRating : ""}`}>
                        {venue.rating}
                      </p>
                    </div>
                  </div>

                  <div className={styles.moreInfo}>
                    <p>
                      {venue.location.city}, {venue.location.country}
                    </p>
                    <p>
                      <strong>${venue.price}</strong> night
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
}

export default BigVenueCards;
