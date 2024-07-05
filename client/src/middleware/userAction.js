import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { serverURL } from "../utils/utilities";

import {
    likeGameStart,
    likeGameSuccess,
    likeGameError,
    dislikeGameStart,
    dislikeGameSuccess,
    dislikeGameError,
    addFavouriteStart,
    addFavouriteSuccess,
    addFavouriteError,
    removeFavouriteStart,
    removeFavouriteSuccess,
    removeFavouriteError,
    favouriteGamefetchStart,
    favouriteGamefetchSuccess,
    favouriteGamefetchError,
} from "../slice/userSlice";

const API = axios.create({ baseURL: serverURL });

export const likeGame = ({ gameId, user_id }) => async (dispatch) => {
    console.log(gameId, user_id);
    dispatch(likeGameStart());
    try {
        const response = await API.post(`/game/like/${gameId}`, { user_id });
        dispatch(likeGameSuccess(response.data));
    } catch (error) {
        dispatch(likeGameError(error.response));
        console.log("Error while liking the game", error);
    }
};

export const dislikeGame = ({ gameId, user_id }) => async (dispatch) => {
    dispatch(dislikeGameStart());
    try {
        const response = await API.post(`/game/dislike/${gameId}`, { user_id });
        dispatch(dislikeGameSuccess(response.data));
    } catch (error) {
        dispatch(dislikeGameError(error.response));
        console.log("Error while disliking the game", error);
    }
};

export const addFavourite = ({ gameId, user_id }) => async (dispatch) => {
    dispatch(addFavouriteStart());
    try {
        const response = await API.post(`/game/favourite/${gameId}`, { user_id });
        dispatch(addFavouriteSuccess(response.data));
    } catch (error) {
        dispatch(addFavouriteError(error.response));
        console.log("Error while adding to favourite", error);
    }
};

export const removeFavourite = ({ gameId, user_id }) => async (dispatch) => {
    dispatch(removeFavouriteStart());
    try {
        const response = await API.delete(`/game/favourite/${gameId}`, {
            data: { user_id }
        });
        dispatch(removeFavouriteSuccess(response.data));
    } catch (error) {
        dispatch(removeFavouriteError(error.response));
        console.log("Error while removing from favourite", error);
    }
};

export const getMyfavouriteGames = async (data, dispatch) => {
    dispatch(favouriteGamefetchStart());
    // console.log("yor data passing from frontent",data)
    try {
        console.log(data.user_id);
        const response = await API.get(`/favourite-games/${data.user_id}`, {
            params: {
                page: data.page, // Add the desired page number
                limit: data.limit, // Specify the limit (e.g., 50)
                filter: data.filter, // Apply any necessary filters
            },
        });
        dispatch(favouriteGamefetchSuccess(response.data));
    } catch (error) {
        dispatch(favouriteGamefetchError(error.response));
        console.log("Error while fetching your favourite games", error);
    }
};
