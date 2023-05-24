import { Grid, Typography, Box } from "@mui/material";
import styles from "./ProfileComp.module.scss";

const InfoSection = ({ _count, venueManager, Guest }) => {
  return (
    <>
      <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }} className={styles.left}>
        {!Guest && (
          <Box className={styles.column}>
            <Typography variant="h5">{_count.bookings}</Typography>
            <Typography variant="body1">Bookings</Typography>
          </Box>
        )}

        {venueManager && (
          <Box className={styles.column}>
            <Typography variant="h5">{_count.venues}</Typography>
            <Typography variant="body1">Venues</Typography>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default InfoSection;
