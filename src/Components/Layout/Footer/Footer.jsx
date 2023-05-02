import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyRight}>
        <p>&copy; 2023 Holidaze. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
