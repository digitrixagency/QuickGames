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
    // gameStatusFetchingStart,s
    // gameStatusFetchingSuccess,
    // gameStatusFetchingError
} from "../slice/userSlice";

const API = axios.create({ baseURL: serverURL });

export const likeGame = (gameId) => async (dispatch) => {
    dispatch(likeGameStart());
    try {
        const response = await API.post(`/game/like/${gameId}`);
        dispatch(likeGameSuccess(response.data));
    } catch (error) {
        dispatch(likeGameError(error.response));
        console.log("Error while liking the game", error);
    }
};

export const dislikeGame = (gameId) => async (dispatch) => {
    dispatch(dislikeGameStart());
    try {
        const response = await API.post(`/game/dislike/${gameId}`);
        dispatch(dislikeGameSuccess(response.data));
    } catch (error) {
        dispatch(dislikeGameError(error.response));
        console.log("Error while disliking the game", error);
    }
};

export const addFavourite = (gameId) => async (dispatch) => {
    dispatch(addFavouriteStart());
    try {
        const response = await API.post(`/game/favourite/${gameId}`);
        dispatch(addFavouriteSuccess(response.data));
    } catch (error) {
        dispatch(addFavouriteError(error.response));
        console.log("Error while adding to favourite", error);
    }
};

export const removeFavourite = (gameId) => async (dispatch) => {
    dispatch(removeFavouriteStart());
    try {
        const response = await API.delete(`/game/favourite/${gameId}`);
        dispatch(removeFavouriteSuccess(response.data));
    } catch (error) {
        dispatch(removeFavouriteError(error.response));
        console.log("Error while removing from favourite", error);
    }
};

export const getMyfavouriteGames = async (data  , dispatch) => {
    dispatch(favouriteGamefetchStart());
    try{
        const response = await API.get(`/favourite-games/${data.user_id}`,{
            
                params: {
                    page: data.page, // Add the desired page number
                    limit: data.limit, // Specify the limit (e.g., 50)
                    filter: data.filter, // Apply any necessary filters
                  },
            
        });
        dispatch(favouriteGamefetchSuccess(response.data));
    }catch (error){
        dispatch(favouriteGamefetchError(error.response));
        console.log("Error while fetching your favourite games", error);
    }
}
