import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Rating,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useVenueActions } from "../../../Hooks/useVenueActions";
import { Link } from "react-router-dom";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#21b47e",
  },
  "& .MuiRating-iconHover": {
    color: "#25cf91",
  },
});

function VenueCreate() {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const { createVenue, isError } = useVenueActions();
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [""],
    price: "",
    maxGuests: "",
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
    },
  });

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleMediaChange = (index, event) => {
    setVenueData({
      ...venueData,
      media: venueData.media.map((url, i) => (i === index ? event.target.value : url)),
    });
  };

  const addMedia = () => {
    setVenueData({ ...venueData, media: [...venueData.media, ""] });
  };

  const removeMedia = (index) => {
    setVenueData({
      ...venueData,
      media: venueData.media.filter((_, i) => i !== index),
    });
  };

  const handleMetaChange = (event) => {
    setVenueData({
      ...venueData,
      meta: { ...venueData.meta, [event.target.name]: event.target.checked },
    });
  };

  const handleLocationChange = (event) => {
    setVenueData({
      ...venueData,
      location: { ...venueData.location, [event.target.name]: event.target.value },
    });
  };

  const handleRatingChange = (event, newValue) => {
    setVenueData({
      ...venueData,
      rating: newValue,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isError) {
      const newVenue = await createVenue(venueData);
      console.log(newVenue);
      setOpenSuccessSnackbar(true);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    } else {
      setOpenErrorSnackbar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  if (!storedProfile) {
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

  if (!storedProfile.venueManager) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Typography variant="body1">You are currently not permitted to make venues.</Typography>
        </Box>
      </Container>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          marginBottom: 8,
          backgroundColor: "background.paper",
        }}
      >
        <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Venue successfully created!
          </Alert>
        </Snackbar>
        <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            An error occurred while creating the venue.
          </Alert>
        </Snackbar>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              name="name"
              label="Venue Name"
              autoFocus
              value={venueData.name}
              onChange={(e) => setVenueData({ ...venueData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              name="description"
              label="Description"
              value={venueData.description}
              onChange={(e) => setVenueData({ ...venueData, description: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={venueData.price}
              onChange={(e) => setVenueData({ ...venueData, price: parseFloat(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="maxGuests"
              name="maxGuests"
              label="Maximum Guests"
              type="number"
              value={venueData.maxGuests}
              onChange={(e) => setVenueData({ ...venueData, maxGuests: parseFloat(e.target.value) })}
            />
          </Grid>
          {venueData.media.map((url, index) => (
            <Grid item xs={12} key={index}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={index === 0 ? 12 : 10}>
                  <TextField
                    key={index}
                    variant="outlined"
                    fullWidth
                    required
                    id={`media${index}`}
                    name={`media${index}`}
                    label={`Media URL ${index + 1}`}
                    value={url}
                    onChange={(e) => handleMediaChange(index, e)}
                  />
                </Grid>
                {index !== 0 && (
                  <Grid item xs={2}>
                    <IconButton onClick={() => removeMedia(index)}>
                      <RemoveCircleOutlineIcon color="error" />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ))}
          <Grid item xs={6}>
            <Button variant="outlined" onClick={addMedia}>
              Add Image
            </Button>
          </Grid>
          <Grid item xs={6} textAlign={"end"}>
            <StyledRating
              sx={{ mt: 0.6 }}
              name="venue-rating"
              value={venueData.rating}
              color="primary"
              onChange={handleRatingChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ p: 2, border: "1px solid lightgray", borderRadius: "5px" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={venueData.meta.wifi} onChange={handleMetaChange} name="wifi" color="primary" />
                    }
                    label="WiFi"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={venueData.meta.parking}
                        onChange={handleMetaChange}
                        name="parking"
                        color="primary"
                      />
                    }
                    label="Parking"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={venueData.meta.breakfast}
                        onChange={handleMetaChange}
                        name="breakfast"
                        color="primary"
                      />
                    }
                    label="Breakfast"
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={venueData.meta.pets} onChange={handleMetaChange} name="pets" color="primary" />
                    }
                    label="Pets Allowed"
                    sx={{ width: "100%" }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="city"
              label="City"
              name="city"
              value={venueData.location.city}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="address"
              label="Address"
              name="address"
              value={venueData.location.address}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={venueData.location.country}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="continent"
              label="Continent"
              name="continent"
              value={venueData.location.continent}
              onChange={handleLocationChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Create Venue
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default VenueCreate;
