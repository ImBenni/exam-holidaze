import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
