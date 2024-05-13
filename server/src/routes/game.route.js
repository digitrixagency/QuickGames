const { Router } = require("express");
const gameController = require('../controllers/game.controller');

const gameRoutes = Router();



gameRoutes.get('/games/category/:category',gameController.getGamesByCategory);
gameRoutes.get('/games/subcategory/:subcategory', gameController.getGamesBySubcategory);
gameRoutes.get('/games/search', gameController.searchGames);
gameRoutes.get('/game/gamedetail/i/:gameId', gameController.getNameByGameId);
gameRoutes.get('/game/gamedetail/t/:title', gameController.getGameByName);
gameRoutes.get('/game/gamedetail/likes/:gameId', gameController.countLikesById);
gameRoutes.get('/game/gamedetail/dislikes/:gameId', gameController.countDislikesById);


module.exports={
    gameRoutes
}
