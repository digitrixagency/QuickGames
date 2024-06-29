import React, { useEffect, useState } from "react";
import { useAppContext } from "../Appcontext";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { GoogleAuth, signUp } from "../../middleware/auth";

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Alert,
  Stack,
  Grid,
  Box,
  Typography
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Email Validation
const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Signup({ auth, setAuth }) {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const userStates = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(null);

  const { setLogin } = useAppContext();

  const changeHandler = (e) => {
    setErrors({ ...errors, [e.target.name]: false });
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let usernameError = details.username === "";
    let emailError = details.email === "" || !isEmail(details.email);
    let passwordError = details.password === "" || details.password < 7;

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
    });

    if (!usernameError && !emailError && !passwordError) {
      await signUp(details, dispatch, navigate);
    }
  };

  const handleCallbackResponse = async (response) => {
    await GoogleAuth(response.credential, dispatch, navigate);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1001853068134-c32ivskhd7vldrhqqob5v1goec6i6o64.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "icon",
      shape: "rectangle",
      theme: "filled_black",
      text: "continue with",
      width: "240px",
    });
  }, []);

  useEffect(() => {
    if (userStates.isUserCreated) {
      setSuccess("User Created! Please login with the same credentials");
    }
  }, [userStates.isUserCreated, setAuth]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '45vh' }}>
        <Box width="90%" maxWidth="400px">
          <Typography variant="h5" component="h1" gutterBottom>
            New to QuickGames? Sign Up
          </Typography>
          <TextField
            label="Username"
            variant="standard"
            fullWidth
            size="small"
            name="username"
            autoComplete="username"
            value={details.username}
            onChange={changeHandler}
            helperText={errors.username && "Username is required"}
            error={errors.username}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            variant="standard"
            fullWidth
            size="small"
            autoComplete="email"
            name="email"
            value={details.email}
            onChange={changeHandler}
            helperText={errors.email && "Email is required"}
            error={errors.email}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth variant="standard" sx={{ mb: 2 }}>
            <InputLabel error={errors.password}>Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              name="password"
              value={details.password}
              onChange={changeHandler}
              error={errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={submitHandler}
            sx={{ mb: 2 }}
          >
            SIGN UP
          </Button>
          <div id="signInDiv"></div>
          {userStates.errorMessage.authForms && (
            <Stack sx={{ width: "100%", pt: 2 }} spacing={2}>
              <Alert severity="error" size="small">
                {userStates.errorMessage.authForms}
              </Alert>
            </Stack>
          )}
          {success && (
            <Stack sx={{ width: "100%", pt: 2 }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already registered?{" "}
            <Typography
              variant="body2"
              component="span"
              sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
              onClick={() => setLogin(true)}
            >
              Login
            </Typography>
          </Typography>
        </Box>
    </Grid>
  );
}
