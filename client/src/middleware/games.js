import axios from "axios";
import { serverURL } from "../utils/utilities";
import { 
    AddGameError, 
    AddGameStart, 
    AddGameSuccess, 
    GetGameFromIDError, 
    GetGameFromIDStart, 
    GetGameFromIDSuccess, 
    GetGameFromNameError, 
    GetGameFromNameStart, 
    GetGameFromNameSuccess, 
    fetchAllGamesError, 
    fetchAllGamesStart, 
    fetchAllGamesSuccess, 
    fetchTopCategoriesError, 
    fetchTopCategoriesStart, 
    fetchTopCategoriesSuccess, 
    subscribedGamefetchError, 
    subscribedGamefetchStart, 
    subscribedGamefetchSuccess 
} from "../slice/userSlice";


const API = axios.create({baseURL : serverURL});

//fetch top 10 categories and data from backend to show in dashboard
export const fetchTopCategories = () => async (dispatch) => {
  
  dispatch(fetchTopCategoriesStart());
  try {
    
      const response = await API.get('/games/top-categories');
      
      dispatch(fetchTopCategoriesSuccess(response.data));
  } catch (error) {
      dispatch(fetchTopCategoriesError());
  }
};


//adding game by admins only for now all can add
export const AddGames = async (data, dispatch, setOpen = () => {},navigate) => {
    dispatch(AddGameStart());
    try {
      const response = await API.post("/", data, {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(AddGameSuccess(response.data));
      setOpen(false);
      navigate(`/product/${response?.data?.id}`)
    } catch (error) {
      console.log(error);
      dispatch(AddGameError(error.response));
    }
};

//user fetching all games (means fetching all games data)
export const fetchAllGames = async (dispatch) => {
    dispatch(fetchAllGamesStart());
    try {
      const response = await API.get("/games/top-categories");
      dispatch(fetchAllGamesSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchAllGamesError(error.response));
    }
};

//fetch all favorate(subscribed) games 💖
export const fetchSubscribedGames = async (dispatch, setSubscribedGames = () => {}) =>{
    dispatch(subscribedGamefetchStart());
    try {
      const response = await API.get("/",{
        withCredentials:true
      });
  
      setSubscribedGames(response.data);
      dispatch(subscribedGamefetchSuccess(response.data));
    } catch (error) {
      dispatch(subscribedGamefetchError(error.response));
    }
}

//for searching purpose
export const getGamesByID = async (id, setGame = () => { },dispatch) => {
    dispatch(GetGameFromIDStart())
    try {
      console.log(id)
      const result = await API.get(`/${id}`, { withCredentials: true });
     setGame(result?.data);
     dispatch(GetGameFromIDSuccess())
    } catch (error) {
      console.log(error);
      console.log("some error occured");
      dispatch(GetGameFromIDError())
    }
  }

  export const getGamesByName = async (name, setGame = () => { },dispatch) => {
    dispatch(GetGameFromNameStart())
    try {
      console.log(name)
      const result = await API.get(`/api/product/${name}`, { withCredentials: true });
     setGame(result?.data);
     dispatch(GetGameFromNameSuccess())
    } catch (error) {
      console.log(error);
      console.log("some error occured");
      dispatch(GetGameFromNameError())
    }
  }
 
  