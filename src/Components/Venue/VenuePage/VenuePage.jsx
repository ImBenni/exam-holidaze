import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import styles from "./VenuePage.module.scss";
import Booking from "../../Booking/Booking";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // This is required for the carousel styles

import { Avatar, LinearProgress } from "@mui/material/";
import { useVenueById } from "../../../Hooks/useFetch";

function handleImageError(e) {
  e.target.src = "https://via.placeholder.com/800x610?text=Image+missing";
  e.target.onerror = null;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function VenuePage() {
  const { id } = useParams();
  const [venue, isLoading, isError] = useVenueById(id);

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  if (!venue) {
    return <div>Product not found.</div>;
  }

  const { name, description, location, price, rating, created, maxGuests, media, meta, owner } = venue;

  return (
    <section className={styles.pageBody}>
      <div className={styles.venuePage}>
        <section className={styles.imgCont}>
          <Carousel emulateTouch={true} showThumbs={false}>
            {media.length > 0 ? (
              media.map((image, index) => (
                <div key={index}>
                  <img
                    src={image || "https://via.placeholder.com/800x610?text=Image+missing"}
                    onError={handleImageError}
                    alt={name}
                  />
                </div>
              ))
            ) : (
              <div>
                <img
                  src="https://via.placeholder.com/800x610?text=Image+missing"
                  onError={handleImageError}
                  alt={name}
                />
              </div>
            )}
          </Carousel>
        </section>
        <section className={styles.contentCont}>
          <section className={styles.topCont}>
            <div className={styles.textCont}>
              <span>
                {location.country}, {location.city}
              </span>
              <h3>{name}</h3>
              <p>{location.address}</p>
            </div>
            <div className={styles.topRight}>
              <div className={styles.ratingCont}>
                <Rating
                  className={styles.rating}
                  initialValue={rating}
                  size={18}
                  readonly
                  fillColor={rating > 0 ? "#21b47e" : "#cccccc"}
                />
              </div>
              <div className={styles.ownerCont}>
                <span>{formatDate(created)}</span>
                <Link to={`/profile/${owner.name}`} className={styles.profile}>
                  <h3>{owner.name}</h3>
                  <Avatar alt={owner.avatar} src={owner.avatar} sx={{ width: 50, height: 50 }} />
                </Link>
              </div>
            </div>
          </section>
          <section className={styles.bottomCont}>
            <div className={styles.infoCont}>
              <p>{description}</p>
              <div className={styles.metaCont}>
                <div className={styles.row}>
                  <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-paw ${meta.pets ? styles.true : styles.false}`}></i>
                    {meta.pets ? <p>Pets Allowed</p> : <p>No Pets Allowed</p>}
                  </div>

                  <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-wifi ${meta.wifi ? styles.true : styles.false}`}></i>
                    {meta.wifi ? <p>WiFi Included</p> : <p>WiFi Not Included</p>}
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-utensils ${meta.breakfast ? styles.true : styles.false}`}></i>
                    {meta.breakfast ? <p>Breakfast Included</p> : <p>Breakfast Not Included</p>}
                  </div>

                  <div className={styles.iconWrapper}>
                    <i className={`fa-solid fa-square-parking ${meta.parking ? styles.true : styles.false}`}></i>
                    {meta.parking ? <p>Parking Included</p> : <p>Parking not Included</p>}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bookingCont}>
              <div className={styles.bookingCard} name="bookingCard">
                <div className={styles.row}>
                  <i className="fas fa-users"></i>
                  <p>
                    <strong>{maxGuests}</strong> Max Guests
                  </p>
                </div>
                <div className={styles.row}>
                  <i className="fas fa-moon"></i>
                  <p>
                    <strong>${price}</strong> per night
                  </p>
                </div>
                <Booking venue={venue} id={id} />
              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}

export default VenuePage;
