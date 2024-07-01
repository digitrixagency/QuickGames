import React, { useEffect, useState } from "react";
import { useAppContext } from "../Appcontext";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  GooglesignIn,signUp } from "../../middleware/auth";
import googleicon from '../../assets/google.png';
import SignupIcon from '@mui/icons-material/PersonAdd';
import { AuthFailure } from "../../slice/userSlice";


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
import { secrets } from "../../environment/config";

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

    if(!details.username || !details.email || !isEmail(details.email) || !details.password || (details.password < 7)){
      setErrors({
        username: details.username.trim() === "" ? true : false,
        email: (details.email.trim() === "" || !isEmail(details.email)) ? true : false,
        password: (details.password === "" || details.password < 7 ) ? true : false,
      });

      return;
    }
  
      await signUp(details, dispatch, navigate);
  };
  const submitHandler1 = async (e) =>{
    // e.preventDefault();
    // if(details.credential === "" && details.password === ""){
    //   setErrors({credential: true, password: true});
    //   return ;
    // }
    // if(details.credential === "") setErrors({...errors, credential: true});
    // if (details.password === "") setErrors({ ...errors, password: true });

    // // console.log(details)
  
    await GooglesignIn(dispatch);
   
    
  }
  const handleCallbackResponse = async (response) => {
    // await GoogleAuth(response.credential, dispatch, navigate);
  };

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: secrets?.google_auth_client,
  //     callback: handleCallbackResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     type: "icon",
  //     shape: "rectangle",
  //     theme: "filled_black",
  //     text: "continue with",
  //     width: "240px",
  //   });
  // }, []);

  useEffect(() => {
    if (userStates.isUserCreated) {
      setSuccess("User Created! Please login with the same credentials");
    }
  }, [userStates.isUserCreated, setAuth]);

  useEffect(() => {
    if (userStates.errorMessage.authForms) {
      const timer = setTimeout(() => {
        dispatch(AuthFailure('')); // Clear the authForms error message
      }, 2700);

      return () => clearTimeout(timer);
    }
  }, [userStates.errorMessage.authForms, dispatch]);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '45vh' }}>
        <Box width="90%" maxWidth="400px">
          <Typography variant="h5" component="h1" gutterBottom className="my-4"> 
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
            startIcon={<SignupIcon style={{ width: '27px', height: '27px' }} className="mr-[6px]" />}
            onClick={submitHandler}
            sx={{ mb: 2 , fontSize:'16px' }}
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
          <div className="flex items-center my-3">
        <div className="flex-grow border-t border-gray-400 mx-2"></div>
        <span className="text-xl text-gray-500 mx-2">OR</span>
        <div className="flex-grow border-t border-gray-400 mx-2"></div>
      </div>
      
        <Button
          variant="contained"
          fullWidth
          startIcon={<img src={googleicon} alt="Google Icon" style={{ width: '27px', height: '27px',marginRight: '6px' }} />}
          sx={{ 
            backgroundColor: 'black',
            color: 'white',
            maxWidth: '400px',
            '&:hover': {
              backgroundColor: 'black',
            },
            marginTop: '0px',
             fontSize: '16px',
            marginBottom: '9px'
          }}
          onClick={ submitHandler1}
        >
          Sign in with Google
        </Button>

        </Box>
    </Grid>
  );
}
