import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVenueActions } from "../../../Hooks/useVenueActions";
import { useVenueById } from "../../../Hooks/useFetch";

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
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#21b47e",
  },
  "& .MuiRating-iconHover": {
    color: "#25cf91",
  },
});

function VenueEdit() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const { editVenue } = useVenueActions();
  const [venues, isLoading, isError] = useVenueById(id);
  const [setRating] = useState(0);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  useEffect(() => {
    if (venues) {
      setVenue(venues);
    }
  }, [venues]);

  const handleMediaChange = (index, event) => {
    setVenue({
      ...venue,
      media: venue.media.map((url, i) => (i === index ? event.target.value : url)),
    });
  };

  const addMedia = () => {
    setVenue({ ...venue, media: [...venue.media, ""] });
  };

  const removeMedia = (index) => {
    setVenue({
      ...venue,
      media: venue.media.filter((_, i) => i !== index),
    });
  };

  const handleMetaChange = (event) => {
    setVenue({
      ...venue,
      meta: { ...venue.meta, [event.target.name]: event.target.checked },
    });
  };

  const handleLocationChange = (event) => {
    setVenue({
      ...venue,
      location: { ...venue.location, [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (venue) {
      try {
        await editVenue(id, venue);
        setOpenSuccessSnackbar(true);
      } catch (error) {
        console.log(error);
        setOpenErrorSnackbar(true);
      }
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }

  if (!venue || isError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box mt={2} p={10} bgcolor="background.paper" boxShadow={3} borderRadius={5} textAlign={"center"}>
          <Typography variant="body1">An error ocured while fetching data.</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      {venue && (
        <Box
          component="form"
          name="venueEditForm"
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
              Venue successfully updated!
            </Alert>
          </Snackbar>
          <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              An error occurred while updating the venue.
            </Alert>
          </Snackbar>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Venue Name"
                autoFocus
                value={venue.name}
                onChange={(e) => setVenue({ ...venue, name: e.target.value })}
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
                label="Description"
                value={venue.description}
                onChange={(e) => setVenue({ ...venue, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                type="number"
                value={venue.price}
                onChange={(e) => setVenue({ ...venue, price: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="maxGuests"
                label="Maximum Guests"
                type="number"
                value={venue.maxGuests}
                onChange={(e) => setVenue({ ...venue, maxGuests: parseFloat(e.target.value) })}
              />
            </Grid>
            {venue.media.map((url, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={index === 0 ? 12 : 10}>
                    <TextField
                      key={index}
                      variant="outlined"
                      fullWidth
                      required
                      id={`media${index}`}
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
                value={venue.rating}
                color="primary"
                onChange={(event, newValue) => {
                  setRating(newValue);
                  setVenue({
                    ...venue,
                    rating: newValue,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ p: 2, border: "1px solid lightgray", borderRadius: "5px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={venue.meta.wifi} onChange={handleMetaChange} name="wifi" color="primary" />
                      }
                      label="WiFi"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={venue.meta.parking}
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
                          checked={venue.meta.breakfast}
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
                        <Checkbox checked={venue.meta.pets} onChange={handleMetaChange} name="pets" color="primary" />
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
                value={venue.location.city}
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
                value={venue.location.address}
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
                value={venue.location.country}
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
                value={venue.location.continent}
                onChange={handleLocationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary">
                Update Venue
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default VenueEdit;
