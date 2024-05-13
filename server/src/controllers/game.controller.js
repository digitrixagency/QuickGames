
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

module.exports = {
  getGamesByCategory,
  getGamesBySubcategory
};
