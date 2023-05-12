import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Rating } from "react-simple-star-rating";
import { useFetch } from "../../../Hooks/useFetch";
import styles from "./RecentVenue.module.scss";
import { useState, useEffect } from "react";

function PlaceholderCard() {
  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.venueCard} ${styles.placeholderCard}`}>
        <div className={`${styles.imgContent} ${styles.placeholderImage}`} />
        <div className={styles.cardContent} />
      </div>
    </div>
  );
}

function RecentVenueCard() {
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

  function getPlaceholderCardCount() {
    if (windowWidth < 550) return 1;
    if (windowWidth < 950) return 2;
    if (windowWidth < 1125) return 3;
    if (windowWidth < 1640) return 4;
    if (windowWidth < 1880) return 5;
    return 6;
  }

  venues.sort((a, b) => new Date(b.created) - new Date(a.created));

  function handleImageError(e) {
    e.target.src = "https://via.placeholder.com/300x210";
    e.target.onerror = null;
  }

  if (isError) {
    return <div className={styles.error}>There was an Error loading data</div>;
  }

  console.log(venues);

  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1880,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1640,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.venueList}>
      {isLoading ? (
        <div className={styles.loadingPlaceholders}>
          {Array.from({ length: getPlaceholderCardCount() }, (_, i) => (
            <PlaceholderCard key={i} />
          ))}
        </div>
      ) : (
        <Slider {...sliderSettings}>
          {venues.map((venue) => (
            <div className={styles.cardWrapper} key={venue.id}>
              <Link to={`/venues/${venue.id}`} className={styles.venueCard}>
                <div className={styles.imgContent}>
                  <img src={venue.media} alt={venue.name} className={styles.venueImage} onError={handleImageError} />
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
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default RecentVenueCard;
