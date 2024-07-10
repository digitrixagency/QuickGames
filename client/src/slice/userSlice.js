import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearLocalCache, getItemFromLocalCache, setItemInLocalCache, removeItemFromLocalCache } from "../cache/localStorage";


import { serverURL } from "../utils/utilities";

export const fetchGameStatus = createAsyncThunk(
    "user/fetchGameStatus",
    async ({ gameId, user_id }, { rejectWithValue }) => {
        console.log(typeof user_id, user_id, "this is user id")
        try {
            // console.log("fetching game status",user_id, gameId)
            const response = await axios.post(`${serverURL}/user/game/${gameId}/status`, {user_id });
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: "user",

    initialState: {
        userInfo: getItemFromLocalCache("userInformation"),
        isLoggedIn: getItemFromLocalCache("isLoggedIn") === null ? false : true,
        isUserCreated:false,
        isFetching: false,
        isError: false,
        errorMessage: {
            authForms: "",
        },
        allGames: [],
        selectedGames: [],
        favouriteGames: [],
        topCategories: [],
        selectedgame: {},
        topCategoriesFetching: false, // Add this line
        topCategoriesError: false, // Add this line
        categoryDescriptions: [],  // Add this line
        categoryDescriptionsFetching: false,  // Add this line
        categoryDescriptionsError: false,  // Add this line
        uniqueCategories: [],  // Add this line
        uniqueCategoriesFetching: false,  // Add this line
        uniqueCategoriesError: false,  // Add this line

        //user Actions on like and favourite
        likeGameFetching: false,
        likeGameError: false,
        dislikeGameFetching: false,
        dislikeGameError: false,
        addFavouriteFetching: false,
        addFavouriteError: false,
        removeFavouriteFetching: false,
        removeFavouriteError: false,

        gameStatus: {
            like_status: null,
            favorited: false,
        },
        gameStatusFetching: false,
        gameStatusError: false,

        getGameDashboardSuccess : true,
        getGameDashboardPending : false,
        getGameDashboardError : false,
        // console.log(action.payload);
        dashboardTopgame : [],
    },

    reducers: {
        AuthStart: (state, action) => {
            state.isFetching = true;
        },
        AuthSuccess: (state, action) => {
            state.isFetching = false;
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            state.errorMessage.authForms="";
            setItemInLocalCache("userInfo", action.payload);
            setItemInLocalCache("isLoggedIn", true);
        },
        AuthSuccessSignUP: (state, action) => {
            state.isFetching = false;
            // state.isLoggedIn = true;
            // state.userInfo = action.payload;
            state.isUserCreated = true;
            state.errorMessage.authForms="";
            // setItemInLocalCache("userInfo", action.payload);
            // setItemInLocalCache("isLoggedIn", true);
        },
        AuthFailure: (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.errorMessage.authForms = action.payload;
        },
        signOutStart: (state) => {
            state.isError = false;
            state.isFetching = true;
        },
        signOutSuccess: (state) => {
            state.isError = false;
            state.isFetching = false;
            state.userInfo = null;
            state.isLoggedIn = false;
            clearLocalCache();
        },
        SignOutError: (state) => {
            state.isError = true;
            state.ispending = false;
        },
        MeStart: (state) => {
            state.isFetching = true;
        },
        MeSuccess: (state, action) => {
            state.isFetching = false;
            state.isLoggedIn = true;
            state.isError = false;
            state.userInfo = action.payload;
            setItemInLocalCache("userInfo", action.payload);
            setItemInLocalCache("isLoggedIn", true);
        },
        MeError: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
            state.isFetching = false;
            clearLocalCache();
        },
        AddGameStart: (state) => {
            state.isFetching = true;
            state.addGameSuccess = false;
            state.addGameError = false;
            state.addGameErrorMessage = "";
        },
        AddGameSuccess: (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.allGames.unshift(action.payload);
            state.addGameSuccess = true;
        },
        AddGameError: (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.addGameError = true;
            state.addGameErrorMessage = action.payload.data.message;
        },
        fetchAllGamesStart: (state) => {
            state.isFetching = true;
        },
        fetchAllGamesSuccess: (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.allGames = action.payload;
        },
        fetchAllGamesError: (state) => {
            state.isError = true;
            state.isFetching = false;
        },
        //for category and sub category games
        fetchselectedGamesStart: (state) => {
            state.isFetching = true;
        },
        fetchselectedGamesSuccess: (state, action) => {
            state.isError = false;
            state.isFetching = false;
            state.selectedGames = action.payload;
           
        },
        fetchselectedGamesError: (state) => {
            state.isError = true;
            state.isFetching = false;
        },
        removeAddGamesStatus: (state) => {
            state.addGameError = false;
            state.addGameSuccess = false;
            state.addGameErrorMessage = "";
        },
        forgotPassStart: (state) => {
            state.forgotPassFetching = true;
            state.forgotPassErrorStatus = false;
        },
        forgotPassSuccess: (state) => {
            state.forgotPassSuccessStatus = true;
            state.forgotPassFetching = false;
        },
        forgotPassError: (state, action) => {
            state.forgotPassErrorStatus = true;
            state.forgotPassFetching = false;
            if (action.payload.status === 429) {
                state.forgotPassErrorErrorMessage = action.payload.data;
            } else {
                state.forgotPassErrorErrorMessage = action.payload.data.message;
            }
        },
        removeforgotPassStatus: (state) => {
            state.forgotPassErrorStatus = false;
            state.forgotPassSuccessStatus = false;
            state.forgotPassErrorErrorMessage = "";
        },
        resetPasswordStart: (state) => {
            state.setPassword = true;
            state.setPasswordStatusError = false;
            state.setPasswordStatusSuccess = false;
        },
        resetPasswordSuccess: (state, action) => {
            state.setPasswordFetching = false;
            state.setPasswordStatusError = false;
            state.setPasswordStatusSuccess = true;
            clearLocalCache();
        },
        resetPasswordError: (state, action) => {
            state.setPasswordFetching = false;
            console.log(action.payload);
            state.setPasswordStatusError = true;
            if (action.payload.status === 429) {
                console.log(action.payload);
                state.setPasswordStatusMessage = action.payload.data;
            } else {
                state.setPasswordStatusMessage = action.payload.data.message;
            }
        },
        removeResetPasswordStatus: (state) => {
            state.setPasswordStatusError = false;
            state.setPasswordStatusMessage = "";
            state.setPasswordStatusSuccess = false;
        },
        favouriteGamefetchStart: (state) => {
            state.favouriteGamefetchStatusSuccess = false;
            state.favouriteGamefetchStatusPending = true;
            state.favouriteGamefetchStatusError = false;
        },
        favouriteGamefetchError: (state, action) => {
            state.favouriteGamefetchStatusPending = false;
            state.favouriteGamefetchStatusSuccess = false;
            state.favouriteGamefetchStatusError = true;
            state.favouriteGamefetchStatusErrorMessage = action.payload.data.message;
        },
        favouriteGamefetchSuccess: (state, action) => {
            state.favouriteGamefetchStatusSuccess = true;
            state.favouriteGamefetchStatusPending = false;
            state.favouriteGamefetchStatusError = false;
            state.favouriteGames = action.payload;
        },
        RemovefavouriteGamefetchstatus: (state) => {
            state.favouriteProductfetchStatusSuccess = false;
            state.favouriteProductfetchStatusError = false;
            state.RemovefavouriteProductfetchstatusMessage = "";
        },

        //Get Game y ID
        GetGameFromIDStart: (state) => {
            state.getGameFromIdSuccess = false;
            state.getGameFromIdPending = true;
            state.getGameFromIdError = false;
        },
        GetGameFromIDSuccess: (state) => {
            state.getGameFromIdSuccess = true;
            state.getGameFromIdPending = false;
            state.getGameFromIdError = false;
        },
        GetGameFromIDError: (state) => {
            state.getGameFromIdSuccess = false;
            state.getGameFromIdPending = false;
            state.getGameFromIdError = true;
        },

        //Get Game by name
        GetGameFromNameStart: (state) => {
            state.getGameFromNameSuccess = false;
            state.getGameFromNamePending = true;
            state.getGameFromNameError = false;
        },
        GetGameFromNameSuccess: (state, action) => {
            state.getGameFromNameSuccess = true;
            state.getGameFromNamePending = false;
            state.getGameFromIdError = false;
            // console.log(action.payload);
            state.selectedgame = action.payload;
            // console.log(state.selectedgame);
        },
        GetGameFromNameError: (state) => {
            state.getGameFromNameSuccess = false;
            state.getGameFromNamePending = false;
            state.getGameFromNameError = true;
        },

        //Get Game by name
        


        //fetching for dashboard
        fetchTopCategoriesStart: (state) => {
            state.topCategoriesFetching = true;
            state.topCategoriesError = false;
        },
        fetchTopCategoriesSuccess: (state, action) => {
            state.topCategoriesFetching = false;
            state.topCategories = action.payload;
        },
        fetchTopCategoriesError: (state) => {
            state.topCategoriesFetching = false;
            state.topCategoriesError = true;
        },

        //fetching descriptions
        fetchCategoryDescriptionsStart: (state) => {
            state.categoryDescriptionsFetching = true;
            state.categoryDescriptionsError = false;
        },
        fetchCategoryDescriptionsSuccess: (state, action) => {
            state.categoryDescriptionsFetching = false;
            state.categoryDescriptions = action.payload;
        },
        fetchCategoryDescriptionsError: (state) => {
            state.categoryDescriptionsFetching = false;
            state.categoryDescriptionsError = true;
        },

        //fetching categories
        fetchUniqueCategoriesStart: (state) => {
            state.uniqueCategoriesFetching = true;
            state.uniqueCategoriesError = false;
        },
        fetchUniqueCategoriesSuccess: (state, action) => {
            state.uniqueCategoriesFetching = false;
            state.uniqueCategories = action.payload;
        },
        fetchUniqueCategoriesError: (state) => {
            state.uniqueCategoriesFetching = false;
            state.uniqueCategoriesError = true;
        },

        //user actions on like and favourite
        likeGameStart: (state) => {
            state.likeGameFetching = true;
            state.likeGameError = false;
        },
        likeGameSuccess: (state, action) => {
            state.likeGameFetching = false;
            state.likeGameError = false;
            // Update the game state with the new like count, if needed
        },
        likeGameError: (state) => {
            state.likeGameFetching = false;
            state.likeGameError = true;
        },
        dislikeGameStart: (state) => {
            state.dislikeGameFetching = true;
            state.dislikeGameError = false;
        },
        dislikeGameSuccess: (state, action) => {
            state.dislikeGameFetching = false;
            state.dislikeGameError = false;
            // Update the game state with the new dislike count, if needed
        },
        dislikeGameError: (state) => {
            state.dislikeGameFetching = false;
            state.dislikeGameError = true;
        },
        addFavouriteStart: (state) => {
            state.addFavouriteFetching = true;
            state.addFavouriteError = false;
        },
        addFavouriteSuccess: (state, action) => {
            state.addFavouriteFetching = false;
            state.addFavouriteError = false;
            // Update the favorite state, if needed
        },
        addFavouriteError: (state) => {
            state.addFavouriteFetching = false;
            state.addFavouriteError = true;
        },
        removeFavouriteStart: (state) => {
            state.removeFavouriteFetching = true;
            state.removeFavouriteError = false;
        },
        removeFavouriteSuccess: (state, action) => {
            state.removeFavouriteFetching = false;
            state.removeFavouriteError = false;
            // Update the favorite state, if needed
        },
        removeFavouriteError: (state) => {
            state.removeFavouriteFetching = false;
            state.removeFavouriteError = true;
        },
        gameStatusFetchingStart: (state) => {
            state.gameStatusFetching = true;
            state.gameStatusError = false;
        },
        gameStatusFetchingError: (state) => {
            state.gameStatusFetching = false;
            state.gameStatusError = true;
        },
        gameStatusFetchingSuccess: (state) => {
            state.gameStatusFetching = false;
            state.gameStatusError = false;
            state.gameStatus = action.payload;
        }

,

        GetGameDashboardStart: (state) => {
            state.getGameDashboardSuccess = false;
            state.getGameDashboardPending = true;
            state.getGameDashboardError = false;
        },
        GetGameDashboardSuccess: (state, action) => {
            state.getGameDashboardSuccess = true;
            state.getGameDashboardPending = false;
            state.getGameDashboardError = false;
            // console.log(action.payload);
            state.dashboardTopgame = action.payload;
            // console.log(state.selectedgame);
        },
        GetGameDashboardError: (state) => {
            state.getGameDashboardSuccess = false;
            state.getGameDashboardPending = false;
            state.getGameDashboardError = true;
        },

    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchGameStatus.pending, (state) => {
            state.gameStatusFetching = true;
            state.gameStatusError = false;
          })
          .addCase(fetchGameStatus.fulfilled, (state, action) => {
            state.gameStatusFetching = false;
            state.gameStatus = action.payload;
          })
          .addCase(fetchGameStatus.rejected, (state, action) => {
            state.gameStatusFetching = false;
            state.gameStatusError = true;
          });
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(likeGame.fulfilled, (state, action) => {
    //             state.gameStatus = { ...state.gameStatus, like_status: 1 };
    //         })
    //         .addCase(dislikeGame.fulfilled, (state, action) => {
    //             state.gameStatus = { ...state.gameStatus, like_status: -1 };
    //         })
    //         .addCase(addFavourite.fulfilled, (state, action) => {
    //             state.gameStatus = { ...state.gameStatus, favorited: true };
    //         })
    //         .addCase(removeFavourite.fulfilled, (state, action) => {
    //             state.gameStatus = { ...state.gameStatus, favorited: false };
    //         })
    //         .addCase(fetchGameStatus.fulfilled, (state, action) => {
    //             state.gameStatus = action.payload;
    //         });
    // },
});

export const {
    AuthStart,
    AuthSuccess,
    AuthSuccessSignUP,
    AuthFailure,
    signOutStart,
    signOutSuccess,
    SignOutError,
    MeStart,
    MeError,
    MeSuccess,
    AddGameError,
    AddGameStart,
    AddGameSuccess,
    fetchAllGamesError,
    fetchAllGamesStart,
    fetchAllGamesSuccess,
    fetchselectedGamesStart,
    fetchselectedGamesSuccess,
    fetchselectedGamesError,
    removeAddGamesStatus,
    forgotPassStart,
    forgotPassSuccess,
    forgotPassError,
    removeforgotPassStatus,
    resetPasswordStart,
    resetPasswordError,
    resetPasswordSuccess,
    removeResetPasswordStatus,
    favouriteGamefetchStart,
    favouriteGamefetchError,
    favouriteGamefetchSuccess,
    RemovefavouriteGamefetchstatus,
    GetGameFromIDStart,
    GetGameFromIDError,
    GetGameFromIDSuccess,
    GetGameFromNameStart,
    GetGameFromNameSuccess,
    GetGameFromNameError,
    fetchTopCategoriesStart,
    fetchTopCategoriesError,
    fetchTopCategoriesSuccess,
    fetchCategoryDescriptionsStart,
    fetchCategoryDescriptionsSuccess,
    fetchCategoryDescriptionsError,
    fetchUniqueCategoriesStart,
    fetchUniqueCategoriesSuccess,
    fetchUniqueCategoriesError,
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
    GetGameDashboardStart,
    GetGameDashboardSuccess,
    GetGameDashboardError

} = userSlice.actions

// console.log(userSlice.actions)
export const selectUser = (state) => state.user.userInfo;
export const userState = (state) => state.user;

export default userSlice.reducer;