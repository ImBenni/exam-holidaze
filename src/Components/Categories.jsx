import { Card, CardContent, Grid, Typography } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ParkIcon from "@mui/icons-material/Park";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function Categories() {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Choose your Adventure
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              height: "250px",
              backgroundColor: "#8FBC8F",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ opacity: 0.7, textAlign: "center" }}>
              <ParkIcon style={{ fontSize: 100 }} />
              <Typography variant="h6" gutterBottom>
                Nature
              </Typography>
              <Typography variant="body2">Embrace the beauty of the outdoors.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#eed130",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ opacity: 0.7, textAlign: "center" }}>
              <AttachMoneyIcon style={{ fontSize: 100 }} />
              <Typography variant="h6" gutterBottom>
                Luxury
              </Typography>
              <Typography variant="body2">Experience the epitome of luxury.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f573b8",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ opacity: 0.7, textAlign: "center" }}>
              <ApartmentIcon style={{ fontSize: 100 }} />
              <Typography variant="h6" gutterBottom>
                Urban
              </Typography>
              <Typography variant="body2">Dive into the pulse of the city.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            sx={{
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#50cacc",
              cursor: "pointer",
              transition: "0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardContent sx={{ opacity: 0.7, textAlign: "center" }}>
              <FamilyRestroomIcon style={{ fontSize: 100 }} />
              <Typography variant="h6" gutterBottom>
                Family
              </Typography>
              <Typography variant="body2">Create lasting memories with your loved ones.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Categories;
