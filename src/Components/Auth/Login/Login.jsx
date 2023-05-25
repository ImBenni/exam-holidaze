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
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const { loginUser, isLoading, isError } = useAuth();

  const validateEmail = (email) => {
    var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password !== "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!validatePassword(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (hasError) {
      return;
    }

    try {
      const loggedin = await loginUser({ email, password });
      if (loggedin) {
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

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
          Log in
        </Typography>
        {isError && (
          <Alert sx={{ mt: 1 }} severity="error">
            Invalid Email or Password!
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: { xs: "100%", sm: 400 } }}>
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
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              helperText={emailError ? "Invalid email address" : ""}
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
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? "Password cannot be empty" : ""}
            />
          </Box>

          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
