import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box } from "@mui/material";

const UpdateAvatar = ({ updateProfileAvatar }) => {
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const openAvatarDialog = () => setAvatarDialogOpen(true);
  const closeAvatarDialog = () => setAvatarDialogOpen(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [avatarUrlError, setAvatarUrlError] = useState("");

  const validateUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleAvatarSubmit = async () => {
    if (!updateProfileAvatar) {
      return;
    } else {
      if (validateUrl(newAvatarUrl)) {
        await updateProfileAvatar(newAvatarUrl);
        closeAvatarDialog();
      } else {
        setAvatarUrlError("Invalid URL");
      }
    }
  };

  return (
    <>
      {updateProfileAvatar && (
        <Box mt={2} textAlign="center">
          <Button onClick={openAvatarDialog} variant="contained" data-testid="editAvatar">
            Edit Avatar
          </Button>
        </Box>
      )}

      <Dialog open={avatarDialogOpen} onClose={closeAvatarDialog}>
        <DialogTitle>Change Avatar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Avatar URL"
            type="url"
            fullWidth
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
            error={Boolean(avatarUrlError)}
            helperText={avatarUrlError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAvatarDialog}>Cancel</Button>
          <Button onClick={handleAvatarSubmit} data-testid="editConfirm">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateAvatar;
