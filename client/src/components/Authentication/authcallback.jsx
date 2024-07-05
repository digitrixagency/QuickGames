import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    AuthFailure, 
    AuthStart, 
    AuthSuccess, 
    AuthSuccessSignUP,
    MeError, 
    MeStart, 
    MeSuccess, 
    SignOutError, 
    forgotPassError, 
    forgotPassStart, 
    forgotPassSuccess, 
    resetPasswordError, 
    resetPasswordStart, 
    resetPasswordSuccess, 
    signOutStart, 
    signOutSuccess,

} from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";


const AuthCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get('user');
  
      console.log('Params:', params.toString()); // Log URL parameters
      console.log('User Param:', userParam); // Log user param
  
      if (userParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userParam));
          console.log('User Data:', userData); // Log user data
  
          dispatch(AuthSuccess(userData));
          console.log('Dispatch successful');
          navigate('/'); // Attempt navigation
        } catch (error) {
          console.error('Error parsing user data:', error);
          navigate('/'); // Navigate to home on error
        }
      } else {
        console.log('No user data found, navigating to home.');
        navigate('/'); // Navigate if no user param
      }
    }, [dispatch, navigate]);
  
    return null;
  };
  
  export default AuthCallback;