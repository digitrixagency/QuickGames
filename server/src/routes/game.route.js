import { Router } from "express";
import * as gameController from '../controllers/game.controller.js';
import { AddFavourite, RemoveFavourite, LikeGame, DislikeGame, getUserLikeOrFavouriteStatus, getFavouriteGamesByUser } from "../controllers/userActions.controller.js";
import VerifyToken from "../middlewares/auth.middleware.js";

const gameRoutes = Router();

//public router
gameRoutes.get('/games/top-categories', gameController.getTopCategories); //data to display on dashboard
gameRoutes.get('/games/category/:category', gameController.getGamesByCategory);
gameRoutes.get('/games/subcategory/:subcategory', gameController.getGamesBySubcategory);
gameRoutes.get('/games/search', gameController.searchGames);
gameRoutes.get('/game/gamedetail/i/:gameId', gameController.getNameByGameId);
gameRoutes.get('/game/gamedetail/t/:title', gameController.getGameByName);
gameRoutes.get('/game/gamedetail/likes/:gameId', gameController.countLikesById);
gameRoutes.get('/game/gamedetail/dislikes/:gameId', gameController.countDislikesById);
gameRoutes.get('/category/description/:category',gameController.getCategoryDescription);
gameRoutes.get('/games/unique-categories', gameController.getAllUniqueCategories);


//protected router
gameRoutes.post('/game/favourite/:gameId', AddFavourite); // Add to favourites
gameRoutes.delete('/game/favourite/:gameId', RemoveFavourite); // Remove from favourites
gameRoutes.post('/game/like/:gameId', LikeGame); // Like a game
gameRoutes.post('/game/dislike/:gameId', DislikeGame); // Dislike a game
gameRoutes.post('/user/game/:gameId/status',  getUserLikeOrFavouriteStatus); // Get user game status
gameRoutes.get('/favourite-games/:user_id', getFavouriteGamesByUser);




export {
    gameRoutes
}
