import axios from "axios";
import { serverURL } from "../utils/utilities";
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
} from "../slice/userSlice";
// import { AuthSuccess } from "../slice/userSlice";

const API = axios.create({ baseURL : serverURL ,withCredentials: true,});

export const signUp = async (data, dispatch, navigate) => {
  console.log(data);
  dispatch(AuthStart());
  try {
    const response = await API.post("/auth/signup", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccessSignUP(response.data));
    navigate("/");
  } catch (error) {
    dispatch(AuthFailure(error.response.data.error.message));
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
    const response = await API.get("/auth/logout", {
      withCredentials: true,
    });

    dispatch(signOutSuccess());
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

export const forgotPasswordmail = async (data, dispatch, navigate) => {
  dispatch(forgotPassStart());
  try {
    const response = await API.post("/auth/sendforgotpassemail", data, {
      withCredentials: true,
    });
    dispatch(forgotPassSuccess(response.data));
    alert("Reset password mail sent successfully."); // Show alert on success
  } catch (error) {
    console.log(error);
    dispatch(forgotPassError(error.response));
  }
};
export const forgotPassword = async (data, dispatch, navigate) => {
  dispatch(forgotPassStart());
  try {
    const response = await API.post("/auth/forgotpass", data, {
      withCredentials: true,
      headers: {
        code: data.code,
      }
    });
    dispatch(forgotPassSuccess(response.data));
    alert("Password updated successfully."); // Show alert on success
    navigate("/")
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

export const GoogleAuth = async (
  token,
  dispatch,
  navigate,
  handleClose = () => {}
) => {
  dispatch(AuthStart());
  try {
    const response = await API.post(
      "/auth/google",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(AuthSuccess(response.data));
    navigate("/");
    handleClose();
  } catch (error) {
    dispatch(AuthFailure(error.response));
    console.log(error);
  }
};
