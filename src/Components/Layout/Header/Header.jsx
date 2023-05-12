import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");


const handleDocumentClick = (event) => {
  const profileButton = document.querySelector(`.${styles.profileButton}`);
  const dropdownMenu = document.querySelector(`.${styles.dropdownMenu}`);

  if (
    profileButton && !profileButton.contains(event.target) &&
    dropdownMenu && !dropdownMenu.contains(event.target)
  ) {
    setDropdownVisible(false);
  }
};


  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('profile');
    navigate("/login");
  };

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
                    <Link onClick={handleLogout}>Log Out</Link>
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
