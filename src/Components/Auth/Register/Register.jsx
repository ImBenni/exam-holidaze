import { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FaceIcon from "@mui/icons-material/Face";

const Register = () => {
  const { registerUser, isLoading, isError, errorMessage } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    venueManager: false,
    password: "",
  });
  const [errors, setErrors] = useState({
    formError: {},
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let error = false;

    if (value === "") {
      error = true;
    } else if (name === "name") {
      if (/[^\w\s]/g.test(value)) {
        error = true;
      }
    } else if (name === "email") {
      if (!/^[A-Za-z0-9._%+-]+@(?:stud\.)?noroff\.no$/.test(value)) {
        error = true;
      }
    } else if (name === "password") {
      if (value.length < 8) {
        error = true;
      }
    } else if (name === "avatar") {
      try {
        new URL(value);
      } catch {
        error = true;
      }
    }

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${name}Error`]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, avatar, password } = formData;
    if (!name || !email || !avatar || !password) {
      setErrors({
        nameError: !name,
        emailError: !email,
        avatarError: !avatar,
        passwordError: !password,
      });
      return;
    }
    try {
      const registered = await registerUser(formData);
      if (registered) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const { nameError, emailError, avatarError, passwordError } = errors;

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.paper",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: { xs: "100%", sm: 400 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              margin="normal"
              id="name"
              label="Name"
              variant="standard"
              name="name"
              fullWidth
              required
              onChange={handleChange}
              error={nameError}
              helperText={nameError ? "Invalid name (should not contain punctuation symbols)" : ""}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              margin="normal"
              id="email"
              label="Email Address"
              variant="standard"
              name="email"
              fullWidth
              autoComplete="email"
              required
              onChange={handleChange}
              error={emailError}
              helperText={emailError ? "Invalid email address" : ""}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <FaceIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              margin="normal"
              id="avatar"
              label="Avatar"
              variant="standard"
              name="avatar"
              fullWidth
              required
              onChange={handleChange}
              error={avatarError}
              helperText={avatarError ? "Invalid URL" : ""}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              onChange={handleChange}
              error={passwordError}
              helperText={passwordError ? "Password should be at least 8 characters" : ""}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.venueManager}
                color="primary"
                name="venueManager"
                onChange={handleChange}
                type="checkbox"
              />
            }
            label="Venue Manager"
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
