import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { useFetch } from "../../../Hooks/useFetch";
import styles from "./VenuePage.module.scss";
import BookingForm from "../../Booking/Booking";

function handleImageError(e) {
  e.target.src = "https://via.placeholder.com/300x210";
  e.target.onerror = null;
}

function VenuePage() {
  const [venues, isLoading, isError] = useFetch("/venues");
  const { id } = useParams();
  const venue = venues.find((p) => p.id === id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  if (!venue) {
    return <div>Product not found.</div>;
  }

  const { name, description, location, price, rating, created, maxGuests, media, meta } = venue;

  return (
    <section className={styles.pageBody}>
      <div className={styles.venuePage}>
        <section className={styles.imgCont}>
          <img src={media} alt={name} onError={handleImageError} />
        </section>
        <section className={styles.contentCont}>
          <section className={styles.topCont}>
            <div className={styles.textCont}>
              <p>
                {location.country}, {location.city}
              </p>
              <h3>{name}</h3>
              <h5>{location.address}</h5>
            </div>
            <Rating
              className={styles.rating}
              initialValue={venue.rating}
              size={18}
              readonly
              fillColor={venue.rating > 0 ? "#21b47e" : "#cccccc"}
            />
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
              <div className={styles.bookingCard}>
                <div className={styles.row}>
                <i className="fas fa-users"></i>
                <p><strong>{maxGuests}</strong> Max Guests</p>
                </div>
                <div className={styles.row}>
                <i className="fas fa-moon"></i>
                <p><strong>${price}</strong> per night</p>
                </div>
                <BookingForm />

              </div>
            </div>
          </section>
        </section>
      </div>
    </section>
  );
}

export default VenuePage;
