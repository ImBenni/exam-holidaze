import { useProfile } from "../../Hooks/useFetch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useVenueActions } from "../../Hooks/useVenueActions";

import AvatarSection from "./AvatarSection";
import DashboardModal from "./DashboardModal";
import InfoSection from "./InfoSection";

import styles from "./ProfileComp.module.scss";
import { Button, Grid, LinearProgress, Typography, Box, Container, Snackbar, Alert } from "@mui/material/";
import UpdateAvatar from "./UpdateAvatar";

const Profile = () => {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const [profile, isLoading, error, refreshProfile, updateProfileAvatar] = useProfile(storedProfile?.name);
  const { deleteVenue } = useVenueActions();
  const [showError, setShowError] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleDeleteVenue = async (venueId) => {
    try {
      await deleteVenue(venueId);
      refreshProfile();

      setSnackbarMessage("Venue successfully deleted");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("An error occurred while deleting the venue");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isLoading || error) {
    return <LinearProgress color="secondary" />;
  }

  if (showError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Typography variant="body1" color="error">
            Error occurred while fetching profile data.
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!storedProfile || !profile) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Typography variant="body1">You are not logged in.</Typography>
          <Button component={Link} to="/login" variant="contained">
            Click here to log in
          </Button>
        </Box>
      </Container>
    );
  }
  const { avatar, bookings, email, name, venueManager, venues, _count } = profile;

  return (
    <Container maxWidth="xl" sx={{ mt: 14 }}>
      <Box mt={2} p={2} bgcolor="background.paper" boxShadow={3} borderRadius={5}>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <Grid container spacing={2} className={styles.profilePage}>
          <InfoSection _count={_count} venueManager={venueManager} Guest={false} />
          <AvatarSection avatar={avatar} name={name} email={email} profile={profile} venueManager={venueManager} />
          <Grid item xs={12} md={4} order={{ xs: 3, md: 3 }} className={styles.right}>
            <UpdateAvatar updateProfileAvatar={updateProfileAvatar} />
            {venueManager && (
              <Box mt={2} textAlign="center">
                <Button data-testid="createVenueButton" href="/venues/create" variant="contained" color="secondary">
                  Create a Venue
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid>
          <DashboardModal
            myVenues={venues}
            bookings={bookings}
            venueManager={venueManager}
            profile={profile}
            handleDeleteVenue={handleDeleteVenue}
          />
        </Grid>
      </Box>
    </Container>
  );
};

export default Profile;
