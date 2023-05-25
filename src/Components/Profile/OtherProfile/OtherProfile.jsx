import { Link, useParams } from "react-router-dom";
import { useOtherProfile } from "../../../Hooks/useFetch";

import AvatarSection from "../AvatarSection";
import InfoSection from "../InfoSection";
import DashboardModal from "../DashboardModal";

import styles from "../ProfileComp.module.scss";
import { Grid, LinearProgress, Typography, Box, Container, Alert, Button } from "@mui/material/";

const ProfileOther = () => {
  const profileName = useParams();
  const [profile, isLoading, isError] = useOtherProfile(profileName.profileName);


  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (!profileName || !profile) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Typography variant="body1">Either couldn't find the user, or you haven't logged in:</Typography>
          <Button sx={{mt: 2}} component={Link} to="/login" variant="contained">
            Click here to log in
          </Button>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Alert severity="error">An error occured</Alert>
        </Box>
      </Container>
    );
  }

  const { avatar, bookings, email, name, venueManager, venues, _count } = profile;

  return (
    <Container maxWidth="lg" sx={{ mt: 14 }}>
      <Box mt={2} p={2} bgcolor="background.paper" boxShadow={3} borderRadius={5}>
        <Grid container spacing={2} className={styles.profilePage}>
          <InfoSection _count={_count} venueManager={venueManager} Guest={true} />
          <AvatarSection avatar={avatar} name={name} email={email} profile={profile} venueManager={venueManager} />
        </Grid>
        <Grid>
          <DashboardModal myVenues={venues} bookings={bookings} venueManager={venueManager} profile={profile} />
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileOther;
