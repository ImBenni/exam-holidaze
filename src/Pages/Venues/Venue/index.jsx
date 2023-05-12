import VenuePage from "../../../Components/Venue/VenuePage/VenuePage";
import { useAuth } from "../../../Hooks/useAuth";
import styles from "./Venue.module.scss";

function Venue() {
  const { registerUser, isLoading, isError } = useAuth();

  // const userData = {
  //   name: "TestUser",
  //   email: "testuser@example.com",
  //   avatar: "avatarString",
  //   venueManager: false,
  //   password: "passwordString",
  // };

  // registerUser(userData)

  return (
    <section className={styles.pageBody}>
      <VenuePage />
    </section>
  );
}

export default Venue;
