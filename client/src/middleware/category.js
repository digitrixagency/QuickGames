import axios from "axios";
import { serverURL } from "../utils/utilities";


import { 
   fetchselectedGamesError,
   fetchselectedGamesSuccess,
   fetchselectedGamesStart,
   fetchCategoryDescriptionsStart,
   fetchCategoryDescriptionsSuccess,
   fetchCategoryDescriptionsError,
   fetchUniqueCategoriesStart,
   fetchUniqueCategoriesSuccess,
   fetchUniqueCategoriesError,

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
    }catch (error){
        dispatch(fetchselectedGamesError(error.response));
        console.log("error while fetching category data",error);
    }
};

export const fetchCategoryDescriptions = (category) => async (dispatch) => {
    dispatch(fetchCategoryDescriptionsStart());
    try {
        // console.log("hi response " + (category));
        const response = await API.get(`/category/description/${category}`);
        // console.log("success response" + (response.data));
        dispatch(fetchCategoryDescriptionsSuccess(response.data));
    } catch (error) {
        dispatch(fetchCategoryDescriptionsError(error.response));
    }
};

export const fetchUniqueCategories = () => async (dispatch) => {
    dispatch(fetchUniqueCategoriesStart());
    try {
        const response = await API.get(`/games/unique-categories`);
        dispatch(fetchUniqueCategoriesSuccess(response.data));
    } catch (error) {
        dispatch(fetchUniqueCategoriesError(error.response));
        console.log("Error while fetching unique categories", error);
    }
};