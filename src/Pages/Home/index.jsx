import { Box, Grid, Typography } from "@mui/material";
import Hero from "../../Components/Hero/Hero";
import BigVenueCards from "../../Components/Venue/BigVenue/BigVenue";
import RecentVenueCard from "../../Components/Venue/RecentVenue/RecentVenue";
import styles from "./Home.module.scss";
import Categories from "../../Components/Categories";

function Home() {
  return (
    <Box>
      <Hero />
      <section className={styles.homeBody}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Recent Venues
            </Typography>
            <RecentVenueCard />
          </Grid>
          <Grid item xs={12}>
            <Categories />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Trendy Venues
            </Typography>
            <BigVenueCards />
          </Grid>
        </Grid>
      </section>
    </Box>
  );
}

export default Home;
