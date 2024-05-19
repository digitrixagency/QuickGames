

import axios from "axios";
import { serverURL } from "../utils/utilities";
import { 
    AuthFailure, 
    AuthStart, 
    AuthSuccess, 
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

} from "../slice/userSlice";
// import { AuthSuccess } from "../slice/userSlice";

const API = axios.create({ baseURL : serverURL });

export const signUp = async (data, dispatch, navigate) => {
    console.log(data);
    dispatch(AuthStart());
    try{
        const response = await API.post("/auth/signup", data , {
            withCredentials:true,
        });
        dispatch(AuthSuccess(response.data));
        navigate("/");
    }catch (error){
        dispatch(AuthFailure(error.response));
        console.log(error.response.data.error.message);
        console.log(error.response.status);
    }
};

export const signIn = async (
    data,
    dispatch,
    navigate,
    handleClose = () => {}
  ) => {
    dispatch(AuthStart());
    try {
      const response = await API.post("/auth/login", data, {
        withCredentials: true,
      });
      dispatch(AuthSuccess(response.data));
      console.log(response.data)
      handleClose();
      navigate("/");
    } catch (error) {
      dispatch(AuthFailure(error.response));
      console.log(error);
    }
};

export const signOut = async (dispatch, navigate) => {
    dispatch(signOutStart());
    try {
      await API.get("/api/auth/sign-out", {
        withCredentials: true,
      });
      dispatch(signOutSuccess());
      navigate("/sign-in");
    } catch (error) {
      dispatch(SignOutError(error.response));
      console.log(error);
    }
};

export const Me = async (dispatch) => {
    dispatch(MeStart());
    try {
      const response = await API.get("/api/auth/me", {
        withCredentials: true,
      });
      dispatch(MeSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(MeError(error.response));
    }
};


export const forgotPassword = async (dispatch, data) => {
    dispatch(forgotPassStart());
    try {
      const response = await API.post("/api/auth/forgot-pass", data, {
        withCredentials: true,
      });
  
      dispatch(forgotPassSuccess());
    } catch (error) {
      console.log(error);
      dispatch(forgotPassError(error.response));
    }
};
  
  export const resetPassword = async (dispatch, data, token) => {
    dispatch(resetPasswordStart());
    try {
      const response = await API.post("/api/auth/reset-pass", data, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch(resetPasswordSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(resetPasswordError(error.response));
    }
};