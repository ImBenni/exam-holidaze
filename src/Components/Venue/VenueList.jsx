import { Rating } from "react-simple-star-rating";
import styles from "./VenueList.module.scss";

function VenueList({ venue }) {

  function handleImageError(e) {
    e.target.src = "https://via.placeholder.com/300x210";
    e.target.onerror = null;
  }

  return (
    <div className={styles.venueCard}>
      <div className={styles.imgContent}>
        <img
          src={venue.media}
          alt={venue.name}
          className={styles.venueImage}
          onError={handleImageError}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.titleAndRating}>
          <h4>{venue.name}</h4>
          <div className={styles.ratingContent}>
            <Rating
              initialValue={venue.rating > 0 ? 1 : 0}
              size={16}
              readonly
              iconsCount={1}
              fillColor={venue.rating > 0 ? "#21b47e" : "#cccccc"}
            />
            <p className={`${styles.ratingText} ${venue.rating > 0 ? styles.hasRating : ""}`}>
              {venue.rating}
            </p>
          </div>
        </div>
        <p className={styles.subTitle}>
          {venue.location.city}, {venue.location.country}
        </p>
        <p>
          <strong>${venue.price}</strong> night
        </p>
      </div>
    </div>
  );
}

export default VenueList;
