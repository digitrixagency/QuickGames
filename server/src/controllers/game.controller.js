
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {handleErrorResponse}=require('../errorResponses');

async function getGamesByCategory(req, res) {
  const { category } = req.params;
  const { filter = 'new', limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let orderBy = {};

  if (filter === 'new') {
    orderBy = { launch_year: 'desc' };
  } else if (filter === 'mostPlayed') {
    orderBy = { played: 'desc' };
  } else if (filter === 'mostLiked') {
    orderBy = { totalLikes: 'desc' }; 
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        category: category.toLowerCase() // Assuming category is stored in lowercase
      },
      orderBy,
      take: Number(limit),
      skip: offset
    });

    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    handleErrorResponse(res,500);
   
  }
}

async function getGamesBySubcategory(req, res) {
  const { subcategory } = req.params;
  const { filter = 'new', limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let orderBy = {};

  if (filter === 'new') {
    orderBy = { launch_year: 'desc' };
  } else if (filter === 'mostPlayed') {
    orderBy = { played: 'desc' };
  } else if (filter === 'mostLiked') {
    orderBy = { totalLikes: 'desc' }; 
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        subcategory: subcategory.toLowerCase() 
      },
      orderBy,
      take: Number(limit),
      skip: offset
    });

    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    handleErrorResponse(res,500);
  }
}



async function searchGames(req, res) {
  const { searchtitle } = req.query;
  const { limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;

  try {
    
    const games = await prisma.game.findMany({
      where: {
        title: {
          contains: searchtitle.toLowerCase() // Case-insensitive search by title
        }
      },
      orderBy: {
        played: 'desc' // Order by most played
      },
      take: Number(limit),
      skip: offset
    });

    res.json(games);
  } catch (error) {
    console.error('Error searching games:', error);
    handleErrorResponse(res,500);
  }
}


async function getGameByName(req, res) {
  const { title } = req.params;

  try {
    const game = await prisma.game.findFirst({
      where: {
        title: {
          equals: title.toLowerCase() // Case-insensitive exact match
        }
      }
    });

    if (!game) {
      return handleErrorResponse(res,404,'Game not found' );
      
    }

    res.json(game);
  } catch (error) {
    console.error('Error getting game by name:', error);
    
    handleErrorResponse(res,500);
  }
}

async function getNameByGameId(req, res) {
  const { gameId } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId)
      }
    });

    if (!game) {
      return handleErrorResponse(res,404,'Game not found' );
    }

    res.json({  game});
  } catch (error) {
    console.error('Error getting game name by ID:', error);
    handleErrorResponse(res,500);
  }
}



async function countLikesById(req, res) {
  const { gameId } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId)
      }
    });

    if (!game) {
      return handleErrorResponse(res, 404, 'Game not found');
    }

    res.json({ title: game.title, totalLikes: game.totalLikes });
  } catch (error) {
    console.error('Error counting likes by ID:', error);
    handleErrorResponse(res, 500);
  }
}

async function countDislikesById(req, res) {
  const { gameId } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId)
      },
      include: {
        likes: true // Include the likes associated with the game
      }
    });

    if (!game) {
      return handleErrorResponse(res, 404, 'Game not found');
    }

    const dislikeCount = game.likes.filter(like => like.like_status === -1).length; // Count dislikes
    res.json({ title: game.title, dislikeCount });
  } catch (error) {
    console.error('Error counting dislikes by ID:', error);
    handleErrorResponse(res, 500);
  }
}

module.exports = {
  getGamesByCategory,
  getGamesBySubcategory,
  searchGames,
  getGameByName,
  getNameByGameId,
  countLikesById,
  countDislikesById
};
