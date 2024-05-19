import axios from "axios";
import { serverURL } from "../utils/utilities";


import { 
   fetchselectedGamesError,
   fetchselectedGamesSuccess,
   fetchselectedGamesStart

} from "../slice/userSlice";


const API = axios.create({ baseURL : serverURL });

export const fetchcategory = async (data, dispatch) => {
    
    dispatch( fetchselectedGamesStart());
    try{
        const response = await API.get(`/games/category/${data.category}`);
        dispatch(fetchselectedGamesSuccess(response.data));
        console.log(data.category);
        console.log(response.data);
    }catch (error){
        dispatch(fetchselectedGamesError(error.response));
        console.log("error while fetching category data",error);
    }
};