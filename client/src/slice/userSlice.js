import { createSlice } from "@reduxjs/toolkit";
import { clearLocalCache, getItemFromLocalCache, setItemInLocalCache, removeItemFromLocalCache } from "../cache/localStorage";

const userSlice = createSlice({
    name: "user",

    initialState: {
        userInfo: getItemFromLocalCache("userInformation"),
        isLoggedIn: getItemFromLocalCache("isLoggedIn") === null ? false : true,
        isFetching: false,
        isError: false,
        errorMessage: {
            authForms: "",
        },
        allGames: [],
        selectedGames:[],
        subscribedGames: [],
        topCategories: [],
        selectedgame:[],
        topCategoriesFetching: false, // Add this line
        topCategoriesError: false, // Add this line
    },

    reducers: {
        AuthStart: (state, action) => {
            state.isFetching = true;
        },
        AuthSuccess: (state, action) => {
            state.isFetching = false;
            state.isLoggedIn = true;
            state.userInfo = action.payload;
            setItemInLocalCache("userInfo", action.payload);
            setItemInLocalCache("isLoggedIn", true);
        },
        AuthFailure: (state, action) => {
            state.isError = true;
            state.isFetching = false;
            state.errorMessage.authForms = action.payload.data.message;
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
        subscribedGamefetchStart: (state) => {
            state.subscribedGamefetchStatusSuccess = false;
            state.subscribedGamefetchStatusPending = true;
            state.subscribedGamefetchStatusError = false;
        },
        subscribedGamefetchError: (state, action) => {
            state.subscribedGamefetchStatusPending = false;
            state.subscribedGamefetchStatusSuccess = false;
            state.subscribedGamefetchStatusError = true;
            state.subscribedGamefetchStatusErrorMessage = action.payload.data.message;
        },
        subscribedGamefetchSuccess: (state, action) => {
            state.subscribedProductfetchStatusSuccess = true;
            state.subscribedProductfetchStatusPending = false;
            state.subscribedProductfetchStatusError = false;
            state.subscribedProducts = action.payload;
        },
        RemoveSubscribedGamefetchstatus: (state) => {
            state.subscribedProductfetchStatusSuccess = false;
            state.subscribedProductfetchStatusError = false;
            state.RemoveSubscribedProductfetchstatusMessage = "";
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
        GetGameFromNameSuccess: (state,action) => {
            state.getGameFromNameSuccess = true;
            state.getGameFromNamePending = false;
            state.getGameFromIdError = false;
            selectedgame=action.payload;
        },
        GetGameFromNameError: (state) => {
            state.getGameFromNameSuccess = false;
            state.getGameFromNamePending = false;
            state.getGameFromNameError = true;
        },

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
    }
});

export const {
    AuthStart,
    AuthSuccess,
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
    subscribedGamefetchStart,
    subscribedGamefetchError,
    subscribedGamefetchSuccess,
    RemoveSubscribedGamefetchstatus,
    GetGameFromIDStart,
    GetGameFromIDError,
    GetGameFromIDSuccess,
    GetGameFromNameStart,
    GetGameFromNameSuccess,
    GetGameFromNameError,
    fetchTopCategoriesStart,
    fetchTopCategoriesError,
    fetchTopCategoriesSuccess

} = userSlice.actions

// console.log(userSlice.actions)
export const selectUser = (state) => state.user.userInfo;
export const userState = (state) => state.user;

export default userSlice.reducer;