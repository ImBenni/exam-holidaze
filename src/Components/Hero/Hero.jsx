import styles from "./Hero.module.scss";

function Hero() {
  return (
    <div className={styles.hero}>
      <h1>Find your Dream Home</h1>
      <p>Stay in the world's most Remarkable Homes</p>
      <button>Book Now</button>
    </div>
  );
}

export default Hero;
