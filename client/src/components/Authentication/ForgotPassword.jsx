import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Typography,
  Grid,
  Alert,
  Stack
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../middleware/auth";

export default function ForgotPassword() {
  const [details, setDetails] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formValid, setFormValid] = useState("");
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const changeHandler = (e) => {
    setErrors({ ...errors, [e.target.name]: false });
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  const submitHandler =async (e) => {
    e.preventDefault();
    let newPasswordError = details.newPassword === "" || details.newPassword.length < 5;
    let confirmPasswordError = details.confirmPassword === "" || details.confirmPassword !== details.newPassword;

    setErrors({
      newPassword: newPasswordError,
      confirmPassword: confirmPasswordError,
    });

    if (!newPasswordError && !confirmPasswordError) {
      // Call your API or handle the password reset logic here
      details.code = code;
      console.log("Code :", details.code);
      console.log("New Password:", details.newPassword);
      console.log("Confirm Password:", details.confirmPassword);
      await forgotPassword(details, dispatch, navigate);
    } else {
      setFormValid("Please correct the errors above.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          width: '70%',
          height: '70vh',
          padding: 3,
        }}
      >
        <Grid item xs={12} sm={8} md={5}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Update Password
            </Typography>
            <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
              <InputLabel htmlFor="new-password">New Password</InputLabel>
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={details.newPassword}
                onChange={changeHandler}
                error={errors.newPassword}
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
            {errors.newPassword && (
              <Typography color="error" variant="body2">
                Password must be at least 5 characters long.
              </Typography>
            )}
            <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
              <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={details.confirmPassword}
                onChange={changeHandler}
                error={errors.confirmPassword}
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
            {errors.confirmPassword && (
              <Typography color="error" variant="body2">
                Passwords must match.
              </Typography>
            )}
            <Button
              variant="contained"
              fullWidth
              startIcon={<LockResetIcon />}
              onClick={submitHandler}
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
            {formValid && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="error" size="small">
                  {formValid}
                </Alert>
              </Stack>
            )}
            {success && (
              <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
                <Alert severity="success" size="small">
                  {success}
                </Alert>
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
