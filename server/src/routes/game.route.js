const { Router } = require("express");
const gameController = require('../controllers/game.controller');

const gameRoutes = Router();



gameRoutes.get('/games/category/:category',gameController.getGamesByCategory);
gameRoutes.get('/games/subcategory/:subcategory', gameController.getGamesBySubcategory);
gameRoutes.get('/games/search', gameController.searchGames);


module.exports={
    gameRoutes
}
