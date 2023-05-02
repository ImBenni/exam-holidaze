import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDocumentClick = (event) => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  const isLoggedIn = false; // Temporary boolean

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <h1>Holidaze</h1>
        </Link>
      </div>
      <div className={styles.headerGroup}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="venues">Venues</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.profile}>
          <button className={styles.profileButton} onClick={toggleDropdown}>
            <img src="https://via.placeholder.com/50" alt="Profile" />
          </button>
          {dropdownVisible && (
            <ul className={styles.dropdownMenu}>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/logout">Log Out</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                  <li>
                    <Link to="/login">Log in</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
