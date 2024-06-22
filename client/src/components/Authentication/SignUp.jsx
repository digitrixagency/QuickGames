import React, { useEffect, useState } from "react";
import { useAppContext } from "../Appcontext";
import { useSelector , useDispatch } from 'react-redux';
import { userState } from "../../slice/userSlice";
import { secrets } from "../../environment/config"; // for google auth
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../middleware/auth";

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
} from "@mui/material";

// Material UI Icon Imports
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";

// Validations

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Signup({auth,setAuth}) {

  //jay's logic start

  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const userStates = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  function changeHandler(e) {
    switch (e.target.name) {
      case "username":
        setErrors({ ...errors, username: false });
        break;
      case "email":
        setErrors({ ...errors, email: false });
        break;
      case "password":
        setErrors({ ...errors, password: false });
        break;
      default:
        break;
    }
    setDetails({ ...details, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(details);

    let { username, email, password } = {
      username: false,
      email: false,
      password: false,
    };
    if (details.username === "") username = true;
    if (details.email === "") email = true;
    if (details.password === "") password = true;

    setErrors({
      username: username,
      email: email,
      password: password,
    });

    console.log(errors);

    if (
      details.username &&
      details.email &&
      details.password
    ) {
      await signUp(details, dispatch, navigate);
     
     
    } else {
      return;
    }
  };


  useEffect(() => {
    if (userStates.isUserCreated) {
      setSuccess("User Created! Please login with same Credentials");
    }
  }, [userStates.isUserCreated, setAuth]);
  //jay's funtionality end's

  const [showPassword, setShowPassword] = React.useState(false);

  // //Inputs
  // const [usernameInput, setUsernameInput] = useState();
  // const [emailInput, setEmailInput] = useState();
  // const [passwordInput, setPasswordInput] = useState();

  // Inputs Errors
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Overall Form Validity
  const [formValid, setFormValid] = useState("");
  const [success, setSuccess] = useState();



  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Username
  const handleUsername = () => {
    if (!usernameInput) {
      setUsernameError(true);
      return;
    }

    setUsernameError(false);
  };

  // Validation for onBlur Email
  const handleEmail = () => {
    console.log(isEmail(emailInput));
    if (!isEmail(emailInput)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
  };

  // Validation for onBlur Password
  const handlePassword = () => {
    if (
      !passwordInput ||
      passwordInput.length < 5 ||
      passwordInput.length > 20
    ) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
  };

  //handle Submittion
  const handleSubmit = () => {
    setSuccess(null);
    //First of all Check for Errors

    // IF username error is true
    if (usernameError || !usernameInput) {
      setFormValid(
        "Username is set btw 5 - 15 characters long. Please Re-Enter"
      );
      return;
    }

    // If Email error is true
    if (emailError || !emailInput) {
      setFormValid("Email is Invalid. Please Re-Enter");
      return;
    }

    // If Password error is true
    if (passwordError || !passwordInput) {
      setFormValid(
        "Password is set btw 5 - 20 characters long. Please Re-Enter"
      );
      return;
    }
    setFormValid(null);

    // Proceed to use the information passed
    console.log("Username : " + usernameInput);
    console.log("Email : " + emailInput);
    console.log("Password : " + passwordInput);

    //Show Successfull Submittion
    setSuccess("User Created! Please login  ");
  };
  const{ loginchk, setLogin
  }=useAppContext()

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          // error={usernameError}
          label="Username"
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          size="small"
          name="username"
          autoComplete="username"
          value={details.username}
          onChange={changeHandler}
          helperText={errors.username && 'Username is required'}
          error={errors.username}
          // value={usernameInput}
          InputProps={{}}
          // onChange={(event) => {
          //   setUsernameInput(event.target.value);
          // }}
          // onBlur={handleUsername}
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <TextField
          label="Email Address"
          fullWidth
          // error={emailError}
          id="standard-basic"
          variant="standard"
          sx={{ width: "100%" }}
          // value={emailInput}
          InputProps={{}}
          size="small"
          autoComplete="email"
          name="email"
          value={details.email}
          error={errors.email}
          helperText={errors.email && "Email is required"}

          onChange={changeHandler}

           onBlur={handleEmail}
          // onChange={(event) => {
          //   setEmailInput(event.target.value);
          // }}
        />
      </div>
      <div style={{ marginTop: "5px" }}>
        <FormControl sx={{ width: "100%" }} variant="standard">
          <InputLabel
            // error={passwordError}
            htmlFor="standard-adornment-password"
          >
            Password
          </InputLabel>
          <Input
            // error={passwordError}
             onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            // onChange={(event) => {
            //   setPasswordInput(event.target.value);
            // }}
            // value={passwordInput}
            autoComplete="password"
          name="password"
          value={details.password}
          error={errors.password}
          helperText={errors.password && "Email is required"}

          onChange={changeHandler}

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
      </div>

      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          // onClick={handleSubmit}
          onClick={submitHandler}
        >
          SIGN UP
        </Button>
      </div>

      {/* Show Form Error if any */}
      {userStates.errorMessage.authForms && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {userStates.errorMessage.authForms}
          </Alert>
        </Stack>
      )}

      {/* Show Success if no issues */}
      {success && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="success" size="small">
            {success}
          </Alert>
        </Stack>
      )}

      <div style={{ marginTop: "7px", fontSize: "10px" }} margin="left">
       
        
        Already registered? ?{" "}
        <small style={{ textDecoration: "underline", color: "blue" , cursor: "pointer"}} onClick={()=>setLogin(true)}>
           Login
        </small>
      </div>
    </div>
  );
}