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
        const response = await API.get(`/games/category/${data.category}`,
            {
                params: {
                    page: data.page, // Add the desired page number
                    limit: data.limit, // Specify the limit (e.g., 50)
                    filter: data.filter, // Apply any necessary filters
                  },
            }
        );
        dispatch(fetchselectedGamesSuccess(response.data));
        console.log(data.category);
        console.log(response.data);
    }catch (error){
        dispatch(fetchselectedGamesError(error.response));
        console.log("error while fetching category data",error);
    }
};