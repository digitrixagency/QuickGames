import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GooglesignIn, forgotPasswordmail, signIn } from "../../middleware/auth";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Appcontext";
import googleicon from '../../assets/google.png'

// Material UI Imports
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
  Button,
  Input,
  Checkbox,
  Alert,
  Stack,
  Grid,
  Box,
  Typography,
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";
import { secrets } from "../../environment/config";
import { AuthFailure } from "../../slice/userSlice";

const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login({ auth, setAuth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStates = useSelector((state) => state.user);

  const [details, setDetails] = useState({ credential: "", password: "" });
  const [errors, setErrors] = useState({ credential: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formValid, setFormValid] = useState(null);
  const [success, setSuccess] = useState(null);

  const { loginchk, setLogin } = useAppContext();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: false }));
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallbackResponse = async (response) => {
    
    // await GoogleAuth(response.credential, dispatch, navigate);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!details.credential || !details.password) {
      setErrors({
        credential: details.credential ? false : true,
        password: details.password ? false : true,
      });
      return;
    }
    await signIn(details, dispatch, navigate);
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
  // const handleCallbackResponse = async (response) => {
  //   // await GoogleAuth(response.credential, dispatch, navigate);
  // };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    if (!details.credential || !isEmail(details.credential)) {
      setErrors({
        credential: true,
        password : false
      });
      return;
    }
    await forgotPasswordmail(details, dispatch, navigate);
  };

  // useEffect(() => {
  //   /* global google */
  //   // google.accounts.id.initialize({
  //   //   client_id: secrets?.google_auth_client,
  //   //   callback: handleCallbackResponse,
  //   // });
  //   // google.accounts.id.renderButton(document.getElementById("loginDiv"), {
  //   //   type: "icon",
  //   //   shape: "rectangle",
  //   //   theme: "filled_black",
  //   //   text: "continue with",
  //   //   width: "100%",
  //   // });

  //   const loginButton = loginDivRef.current.querySelector("div");
  //   if (loginButton) {
  //     loginButton.addEventListener("click", async() => {
  //       await GoogleAuth(response.credential, dispatch, navigate);
  //       // Add any additional functionality here
  //     });
  //   }
  // }, [loginDivRef]);

  useEffect(() => {
    if (userStates.isLoggedIn) {
      setAuth(false);
    }
  }, [userStates.isLoggedIn, setAuth]);

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
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "45vh" }}>
      <Box width="90%" maxWidth="400px">
        <form onSubmit={submitHandler}>
          <TextField
            label="Email Address"
            fullWidth
            variant="standard"
            name="credential"
            onChange={changeHandler}
            value={details.credential}
            error={errors.credential}
            margin="dense"
            autoComplete="email"
          />
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel error={errors.password} htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
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
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Checkbox
                size="small"
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember Me
            </Grid>
            <Grid item>
              <a style={{ cursor: "pointer", textDecoration: "underline", color: "blue" }} onClick={forgotPasswordHandler}>
                Forgot Password?
              </a>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon  style={{ width: '27px', height: '27px' }}  />}
            type="submit"
            onClick={submitHandler}
            style={{ marginTop: "10px" , marginBottom:"9px"  , fontSize:'16px'}}
          >
            LOGIN
          </Button>
          </form>
          <div id="loginDiv" ></div>
          {/* Show Form Error if any */}
      
      {userStates.errorMessage.authForms && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {userStates.errorMessage.authForms}
          </Alert>
        </Stack>
        // <div>{userStates.errorMessage.authForms}</div>
      )}
          {/* {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )} */}
           <Typography variant="body2" align="center" sx={{ mt: 2 }}>
           New to QuickGames?{" "}
            <Typography
              variant="body2"
              component="span"
              sx={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
              onClick={() => setLogin(false)}
            >
              Sign Up
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
