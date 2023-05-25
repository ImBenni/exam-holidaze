import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileComp.module.scss";
import { useVenueProfile } from "../../Hooks/useFetch";

import {
  Grid,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Tabs,
  Tab,
  DialogContentText,
  IconButton,
  CardActions,
  CardContent,
  CardMedia,
  Card,
  Tooltip,
  Modal,
} from "@mui/material";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GroupIcon from "@mui/icons-material/Group";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { deleteBooking } from "../../Hooks/useBook";

const DashboardModal = ({ myVenues, bookings, venueManager, profile, handleDeleteVenue }) => {
  const User = handleDeleteVenue; // This is used when Other Users access the Profile (it will hide certain elements)
  const [value, setValue] = useState(0);
  const [venues] = useVenueProfile(profile.name);

  const [selectedVenue, setSelectedVenue] = useState(null);

  const matchedVenues = [];
  for (const myVenue of myVenues) {
    const matchedVenue = venues.find((venue) => venue.id === myVenue.id);

    if (matchedVenue) {
      matchedVenues.push(matchedVenue);
    }
  }

  let venuesToRender = User ? matchedVenues : myVenues;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [venueId, setVenueId] = useState(null);
  const handleDialogOpen = (id) => {
    setOpenDialog(true);
    setVenueId(id);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setVenueId(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [bookingId, setbookingId] = useState(null);

  const handleBookDialogOpen = (id) => {
    setOpenBookDialog(true);
    setbookingId(id);
  };
  const handleBookDialogClose = () => {
    setOpenBookDialog(false);
    setbookingId(null);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const getBookingStatus = (startDate, endDate) => {
    const now = new Date();
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    if (now < startDate) {
      const diff = Math.floor((startDate - now) / (1000 * 60 * 60 * 24));
      if (diff > 7) return { status: "Upcoming", color: "primary" };
      else return { status: "Due Soon", color: "secondary" };
    } else if (now >= startDate && now <= endDate) {
      return { status: "In Progress", color: "error" };
    } else {
      return { status: "Completed", color: "info" };
    }
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <>
      <Dialog
        open={openBookDialog}
        onClose={handleBookDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to cancel this booking?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Cancelling this booking is a permanent action and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBookDialogClose}>Cancel</Button>
          <Button
            name="confirmDelete"
            onClick={() => {
              handleCancelBooking(bookingId);
              handleBookDialogClose();
            }}
            color="error"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={12} md={4} order={{ xs: 3, md: 3 }} className={styles.right}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {User && <Tab label="Your Bookings" {...a11yProps(0)} />}
                {venueManager && <Tab label="Venues Created" {...a11yProps(1)} />}
              </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
              {User && (
                <Box sx={{ p: 0 }}>
                  <Grid container spacing={2}>
                    {bookings.length > 0 ? (
                      bookings.map((booking, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ textDecoration: "none" }}>
                          <Card
                            sx={{
                              boxShadow: 2,
                              transition: "0.3s",
                              "&:hover": {
                                transform: "scale(1.03)",
                                boxShadow: 3,
                              },
                            }}
                          >
                            <CardMedia sx={{ height: 200 }} image={booking.venue.media[0]} title={booking.venue.name} />
                            <CardContent>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={8} md={9}>
                                  <Box>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        fontSize: "1rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {booking.venue.name}
                                    </Typography>

                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                      style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                                    >
                                      {booking.venue.location.city}, {booking.venue.location.country}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={4} md={3}>
                                  <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                    <Tooltip title="Open Venue">
                                      <IconButton
                                        component={Link}
                                        to={`/venues/${booking.venue.id}`}
                                        color="info"
                                        size="small"
                                        name="openVenue"
                                      >
                                        <LinkIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Cancel Booking">
                                      <IconButton
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          handleBookDialogOpen(booking.id);
                                        }}
                                        color="error"
                                        size="small"
                                        name="cancelBooking"
                                      >
                                        <DoDisturbOnOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </Box>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography variant="body2" color="text.secondary">
                                    {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                                    {new Date(booking.dateTo).toLocaleDateString()}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </CardContent>
                            <CardActions
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                              }}
                            >
                              {" "}
                              <Chip
                                label={getBookingStatus(booking.dateFrom, booking.dateTo).status}
                                color={getBookingStatus(booking.dateFrom, booking.dateTo).color}
                                variant="outlined"
                              />
                              <Tooltip title="Guests">
                                <Chip icon={<GroupIcon />} label={booking.guests} variant="outlined" />
                              </Tooltip>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Typography>No bookings made yet.</Typography>
                    )}
                  </Grid>
                </Box>
              )}
            </TabPanel>

            {venueManager && (
              <TabPanel value={value} index={!User ? 0 : 1}>
                {User && (
                  <Button
                    startIcon={<AddIcon />}
                    component={Link}
                    to="/venues/create"
                    variant="contained"
                    color="primary"
                    sx={{ mb: 2 }}
                  >
                    Create Venue
                  </Button>
                )}
                <Box sx={{ p: 0 }}>
                  <Grid container spacing={2}>
                    {venuesToRender.length > 0 ? (
                      venuesToRender.map((venue, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <Card
                            sx={{
                              boxShadow: 2,
                              transition: "0.3s",
                              "&:hover": {
                                transform: "scale(1.03)",
                                boxShadow: 3,
                              },
                            }}
                          >
                            <CardMedia sx={{ height: 200 }} image={venue.media[0]} title={venue.name} />
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "start",
                                  }}
                                >
                                  <Box sx={{ maxWidth: "90%" }}>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        fontSize: "1rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {venue.name}
                                    </Typography>
                                    <Typography
                                      variant="body1"
                                      color="text.secondary"
                                      style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {venue.location.city}, {venue.location.country}
                                    </Typography>
                                  </Box>
                                  <Tooltip title="Open Venue">
                                    <IconButton
                                      component={Link}
                                      to={`/venues/${venue.id}`}
                                      color="info"
                                      size="small"
                                      name="openVenue"
                                    >
                                      <LinkIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </CardContent>
                            <CardActions
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                              }}
                            >
                              {User && (
                                <Box>
                                  <Button
                                    variant="outlined"
                                    name="editVenue"
                                    startIcon={<EditIcon />}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                    }}
                                    size="small"
                                    sx={{ ml: 1 }}
                                    component={Link}
                                    to={`/venues/edit/${venue.id}`}
                                  >
                                    Edit
                                  </Button>

                                  <Button
                                    variant="outlined"
                                    name="deleteVenue"
                                    startIcon={<DeleteIcon />}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleDialogOpen(venue.id);
                                    }}
                                    color="error"
                                    size="small"
                                    sx={{ ml: 1 }}
                                  >
                                    Delete
                                  </Button>
                                </Box>
                              )}

                              {User && (
                                <Box marginRight={1}>
                                  <Tooltip title="Bookings Made">
                                    <Chip
                                      onClick={() => {
                                        setSelectedVenue(venue);
                                        handleOpen();
                                      }}
                                      icon={<BookmarksOutlinedIcon />}
                                      label={venue.bookings.length}
                                      variant="outlined"
                                    />
                                  </Tooltip>
                                </Box>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Typography>No venues added yet.</Typography>
                    )}

                    {User && (
                      <>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 500,
                              bgcolor: "background.paper",
                              boxShadow: 2,
                              p: 4,
                            }}
                          >
                            {selectedVenue && selectedVenue.bookings.length > 0 ? (
                              selectedVenue.bookings.map((booking, bookingIndex) => (
                                <Box
                                  key={bookingIndex}
                                  sx={{ my: 1, p: 1, border: "1px solid lightgray", borderRadius: "5px" }}
                                >
                                  <Typography variant="subtitle1">Booking {bookingIndex + 1}</Typography>
                                  <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                      <Box paddingBottom={1}>
                                        <Typography variant="subtitle1">Start Date:</Typography>
                                        <Typography variant="body2">
                                          {new Date(booking.dateFrom).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Box paddingBottom={1}>
                                        <Typography variant="subtitle1">End Date:</Typography>
                                        <Typography variant="body2">
                                          {new Date(booking.dateTo).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={4}>
                                      <Box paddingBottom={1}>
                                        <Typography variant="subtitle1">Guests:</Typography>
                                        <Typography variant="body2">{booking.guests}</Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                </Box>
                              ))
                            ) : (
                              <Typography>No bookings</Typography>
                            )}
                          </Box>
                        </Modal>

                        <Dialog
                          open={openDialog}
                          onClose={handleDialogClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete this venue?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Deleting this venue is a permanent action and cannot be undone.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleDialogClose}>Cancel</Button>
                            <Button
                              name="confirmDelete"
                              onClick={() => {
                                handleDeleteVenue(venueId);
                                handleDialogClose();
                              }}
                              color="error"
                              autoFocus
                            >
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    )}
                  </Grid>
                </Box>
              </TabPanel>
            )}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default DashboardModal;
