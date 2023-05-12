import Hero from "../../Components/Hero/Hero";
import BigVenueCards from "../../Components/Venue/BigVenue/BigVenue";
import RecentVenueCard from "../../Components/Venue/RecentVenue/RecentVenue";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div>
      <Hero />
      <section className={styles.homeBody}>
        <div className={styles.recentVenues}>
          <h3>Recent Venues</h3>
          <RecentVenueCard />
          <h3>Popular Venues</h3>
          <BigVenueCards/>
        </div>
      </section>
    </div>
  );
}

export default Home;
