const { Router } = require("express");
const gameController = require('../controllers/game.controller');

const gameRoutes = Router();



gameRoutes.get('/games/:category',gameController.getGamesByCategory);
gameRoutes.get('/games/:subcategory', gameController.getGamesBySubcategory);


module.exports={
    gameRoutes
}
