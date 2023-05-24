import { Snackbar, Alert } from "@mui/material";

const ProfileSnackbar = ({ _count, venueManager }) => {
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

  return (
    <>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileSnackbar;
