import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  userState } from "../../slice/userSlice";
import { signIn } from "../../middleware/auth";
import { useAppContext } from "../Appcontext";


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
import { useNavigate } from "react-router-dom";

// Email Validation
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function Login() {
  //Jay's code start

  const userStates = useSelector(userState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    credential: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    credential: false,
    password: false,
  });

  function changeHandler(e) {
    if (e.target.name === "credential") {
      setErrors({ ...errors, credential: false });
    }
    if (e.target.name === "password") {
      setErrors({ ...errors, password: false });
    }

    setDetails({ ...details, [e.target.name]: e.target.value });
    
  }

  const submitHandler = async (e) =>{
    e.preventDefault();
    if(details.credential === "" && details.password === ""){
      setErrors({credential: true, password: true});
      return ;
    }
    if(details.credential === "") setErrors({...errors, credential: true});
    if (details.password === "") setErrors({ ...errors, password: true });

    // console.log(details)
    await signIn(details, dispatch, navigate);
  }


  // Jay's code end
  const [showPassword, setShowPassword] = React.useState(false);

  //Inputs
  // const [emailInput, setEmailInput] = useState();
  // const [passwordInput, setPasswordInput] = useState();
  const [rememberMe, setRememberMe] = useState();

  // // Inputs Errors
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState(false);

  // // Overall Form Validity
  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  // Handles Display and Hide Password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Label for Checkbox
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // Validation for onBlur Email
  // const handleEmail = () => {
  //   console.log(isEmail(emailInput));
  //   if (!isEmail(emailInput)) {
  //     setEmailError(true);
  //     return;
  //   }

  //   setEmailError(false);
  // };

  // Validation for onBlur Password
  // const handlePassword = () => {
  //   if (
  //     !passwordInput ||
  //     passwordInput.length < 5 ||
  //     passwordInput.length > 20
  //   ) {
  //     setPasswordError(true);
  //     return;
  //   }

  //   setPasswordError(false);
  // };

  //handle Submittion
  // const handleSubmit = () => {
  //   setSuccess(null);
  //   //First of all Check for Errors

  //   // If Email error is true
  //   if (emailError || !emailInput) {
  //     setFormValid("Email is Invalid. Please Re-Enter");
  //     return;
  //   }

  //   // If Password error is true
  //   if (passwordError || !passwordInput) {
  //     setFormValid(
  //       "Password is set btw 5 - 20 characters long. Please Re-Enter"
  //     );
  //     return;
  //   }
  //   setFormValid(null);

  //   // Proceed to use the information passed
  //   console.log("Email : " + emailInput);
  //   console.log("Password : " + passwordInput);
  //   console.log("Remember : " + rememberMe);

  //   //Show Successfull Submittion
  //   setSuccess("Form Submitted Successfully");
  // };

  const{ loginchk, setLogin
  }=useAppContext()

 
  return (
    <div>
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
          // onBlur={handleEmail}
          // onChange={(event) => {
          //   setEmailInput(event.target.value);
          // }}
          autoComplete="email"
          name="credential"
          onChange={changeHandler}
          value={details.credential}
          error={errors.credential}

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
            // onBlur={handlePassword}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            // onChange={(event) => {
            //   setPasswordInput(event.target.value);
            // }}
            // value={passwordInput}

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
      </div>
      <div style={{  fontSize: "10px", display: "flex", justifyContent: "space-between" }}>
      <div style={{ fontSize: "10px" }}>
        <Checkbox
          {...label}
          size="small"
          
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember Me  <a style={{ marginLeft: '72px' ,cursor:'pointer', textDecoration: "underline", color: "blue"} }>Forgot Password?</a>
      </div>
     
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<LoginIcon />}
          // onClick={handleSubmit}
          onClick={submitHandler}
        >
          LOGIN
        </Button>
      </div>

      {/* Show Form Error if any */}
      {formValid && (
        <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
          <Alert severity="error" size="small">
            {formValid}
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
      
        New to QuickGames?{" "}
        <small style={{ textDecoration: "underline", color: "blue" , cursor: "pointer"}} onClick={()=>setLogin(false)}>
          Sign Up
        </small>

        
      </div>
    </div>
  );
}