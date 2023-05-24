import { Grid, Avatar, Box, Typography, Chip } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import styles from "./ProfileComp.module.scss";

const AvatarSection = ({ avatar, name, email, profile, venueManager, updateProfileAvatar }) => {
  return (
    <>
      <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }} className={styles.avatar}>
        <Avatar
          alt={name}
          src={profile ? avatar : null}
          sx={{ width: { xs: 150, sm: 250 }, height: { xs: 150, sm: 250 } }}
        />
        <Box mt={2} textAlign="center">
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2">{email}</Typography>
          {venueManager && (
            <Chip color="primary" label="Venue Manager" icon={<AdminPanelSettingsIcon />} sx={{ mt: 1 }} />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default AvatarSection;
