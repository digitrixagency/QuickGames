import { PrismaClient } from "@prisma/client";
import { handleErrorResponse } from "../errorResponses.js";

const prisma = new PrismaClient();

//Finding top 10 categories to display data on Home page
async function getTopCategories(req, res) {
  try {
    // Aggregate data to find top 10 categories based on the number of games
    const categories = await prisma.game.groupBy({
      by: ["category"],  
      _count: {
        category: true,
      },
      orderBy: {
        _count: {
          category: "desc",
        },
      },
      take: 10,
    });

    // Fetch data for these top categories
    const categoryDataPromises = categories.map(async (category) => {
      const games = await prisma.game.findMany({
        where: {
          category: category.category,
        },
        orderBy: {
          played: "desc",
        },
        take: 20, // Fetch top 5 games for each category, adjust as needed
      });
      return {
        category: category.category,
        gameCount: category._count.category,
        games,
      };
    });

    const categoryData = await Promise.all(categoryDataPromises);

    res.json(categoryData);
  } catch (error) {
    console.error("Error fetching top categories:", error);
    handleErrorResponse(res, 500);
  }
}

async function getGamesByCategory(req, res) {
  
  const { category } = req.params;
  const { filter = "new", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let orderBy = {};

  if (filter === "new") {
    orderBy = { launch_year: "desc" };
  } else if (filter === "mostPlayed") {
    orderBy = { played: "desc" };
  } else if (filter === "mostLiked") {
    orderBy = { totalLikes: "desc" };
  }
 
  try {
    const games = await prisma.game.findMany({
      where: {
        category: category, // Assuming category is stored in lowercase
      },
      orderBy,
      take: Number(limit),
      skip: offset,
    });
// console.log(games);
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    handleErrorResponse(res, 500);
  }
}

async function getGamesBySubcategory(req, res) {
  const { subcategory } = req.params;
  const { filter = "new", limit = 10, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  let orderBy = {};

  if (filter === "new") {
    orderBy = { launch_year: "desc" };
  } else if (filter === "mostPlayed") {
    orderBy = { played: "desc" };
  } else if (filter === "mostLiked") {
    orderBy = { totalLikes: "desc" };
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        subcategory: subcategory,
      },
      orderBy, 
      take: Number(limit),
      skip: offset,
    });

    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    handleErrorResponse(res, 500);
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
          contains: searchtitle, 
          mode: 'insensitive',
        },
      },
      orderBy: {
        played: "desc", // Order by most played
      },
      take: Number(limit),
      skip: offset,
    });

    res.json(games);
  } catch (error) {
    console.error("Error searching games:", error);
    handleErrorResponse(res, 500);
  }
}



async function getDashboardGames(req, res) {
  const { limit = 5 } = req.query; // Default limit to fetch is 5 games

  try {
    const topGames = await prisma.game.findMany({
      orderBy: [
        { launch_year: 'desc' }, // Order by launch year descending
        { totalLikes: 'desc' }   // Then by total likes descending
      ],
      take: Number(limit),
    });

    res.json(topGames);
  } catch (error) {
    console.error("Error fetching top games by launch year and likes:", error);
    handleErrorResponse(res, 500);
  }
}
async function getGameByName(req, res) {
  const { title } = req.params;
 

  try {
    const game = await prisma.game.findFirst({
      where: {
        title: {
          equals: title, // Case-insensitive exact match
          mode: 'insensitive',
        },
      },
    });
    // console.log(game);
    if (!game) {
      return handleErrorResponse(res, 404, "Game not found");
    }

    res.json(game);
  } catch (error) {
    console.error("Error getting game by name:", error);

    handleErrorResponse(res, 500);
  }
}

async function getNameByGameId(req, res) {
  const { gameId } = req.params;
  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId),
      },
    });

    if (!game) {
      return handleErrorResponse(res, 404, "Game not found");
    }

    res.json({ game });
  } catch (error) {
    console.error("Error getting game name by ID:", error);
    handleErrorResponse(res, 500);
  }
}

async function countLikesById(req, res) {
  const { gameId } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId),
      },
    });

    if (!game) {
      return handleErrorResponse(res, 404, "Game not found");
    }

    res.json({ title: game.title, totalLikes: game.totalLikes });
  } catch (error) {
    console.error("Error counting likes by ID:", error);
    handleErrorResponse(res, 500);
  }
}

async function countDislikesById(req, res) {
  const { gameId } = req.params;

  try {
    const game = await prisma.game.findUnique({
      where: {
        id: parseInt(gameId),
      },
      include: {
        likes: true, // Include the likes associated with the game
      },
    });

    if (!game) {
      return handleErrorResponse(res, 404, "Game not found");
    }

    const dislikeCount = game.likes.filter(
      (like) => like.like_status === -1
    ).length; // Count dislikes
    res.json({ title: game.title, dislikeCount });
  } catch (error) {
    console.error("Error counting dislikes by ID:", error);
    handleErrorResponse(res, 500);
  }
}


//Retriving descriptions from backend based on category getting in req
async function getCategoryDescription(req, res) {
  const { category } = req.params;
  // console.log(category)
  try {
    const categoryDetails = await prisma.category.findMany({
      where: {
        category_name: category,
      },
      include: {
        CategorySubDescription: true,
      },
    });

    if (categoryDetails.length === 0) {
      return handleErrorResponse(res, 404, "Category not found");
    }
    

    res.json(categoryDetails);
  } catch (error) {
    console.error("Error fetching category description:", error);
    handleErrorResponse(res, 500);
  }
}

//getting all categories for sidebar in app
async function getAllUniqueCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        category_name: true,
        icon: true,
        description1: true
      },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    handleErrorResponse(res, 500);
  }
}

export {
  getTopCategories,
  getGamesByCategory,
  getGamesBySubcategory,
  searchGames,
  getGameByName,
  getNameByGameId,
  countLikesById,
  countDislikesById,
  getCategoryDescription,
  getAllUniqueCategories,
  getDashboardGames
};


// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const { handleErrorResponse } = require("../errorResponses");

// //Finding to 10 categories to display data in Home page
// async function getTopCategories(req, res) {
//   try {
//     // Aggregate data to find top 10 categories based on number of games
//     const categories = await prisma.game.groupBy({
//       by: ["category"],
//       _count: {
//         category: true,
//       },
//       orderBy: {
//         _count: {
//           category: "desc",
//         },
//       },
//       take: 10,
//     });

//     // Fetch data for these top categories
//     const categoryDataPromises = categories.map(async (category) => {
//       const games = await prisma.game.findMany({
//         where: {
//           category: category.category,
//         },
//         orderBy: {
//           played: "desc",
//         },
//         take: 20, // Fetch top 5 games for each category, adjust as needed
//       });
//       return {
//         category: category.category,
//         gameCount: category._count.category,
//         games,
//       };
//     });

//     const categoryData = await Promise.all(categoryDataPromises);

//     res.json(categoryData);
//   } catch (error) {
//     console.error("Error fetching top categories:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function getGamesByCategory(req, res) {
//   const { category } = req.params;
//   const { filter = "new", limit = 10, page = 1 } = req.query;
//   const offset = (page - 1) * limit;
//   let orderBy = {};

//   if (filter === "new") {
//     orderBy = { launch_year: "desc" };
//   } else if (filter === "mostPlayed") {
//     orderBy = { played: "desc" };
//   } else if (filter === "mostLiked") {
//     orderBy = { totalLikes: "desc" };
//   }

//   try {
//     const games = await prisma.game.findMany({
//       where: {
//         category: category, // Assuming category is stored in lowercase
//       },
//       orderBy,
//       take: Number(limit),
//       skip: offset,
//     });

//     res.json(games);
//   } catch (error) {
//     console.error("Error fetching games:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function getGamesBySubcategory(req, res) {
//   const { subcategory } = req.params;
//   const { filter = "new", limit = 10, page = 1 } = req.query;
//   const offset = (page - 1) * limit;
//   let orderBy = {};

//   if (filter === "new") {
//     orderBy = { launch_year: "desc" };
//   } else if (filter === "mostPlayed") {
//     orderBy = { played: "desc" };
//   } else if (filter === "mostLiked") {
//     orderBy = { totalLikes: "desc" };
//   }

//   try {
//     const games = await prisma.game.findMany({
//       where: {
//         subcategory: subcategory,
//       },
//       orderBy,
//       take: Number(limit),
//       skip: offset,
//     });

//     res.json(games);
//   } catch (error) {
//     console.error("Error fetching games:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function searchGames(req, res) {
//   const { searchtitle } = req.query;
//   const { limit = 10, page = 1 } = req.query;
//   const offset = (page - 1) * limit;

//   try {
//     const games = await prisma.game.findMany({
//       where: {
//         title: {
//           contains: searchtitle, // Case-insensitive search by title
//         },
//       },
//       orderBy: {
//         played: "desc", // Order by most played
//       },
//       take: Number(limit),
//       skip: offset,
//     });

//     res.json(games);
//   } catch (error) {
//     console.error("Error searching games:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function getGameByName(req, res) {
//   const { title } = req.params;

//   try {
//     const game = await prisma.game.findFirst({
//       where: {
//         title: {
//           equals: title, // Case-insensitive exact match
//         },
//       },
//     });

//     if (!game) {
//       return handleErrorResponse(res, 404, "Game not found");
//     }

//     res.json(game);
//   } catch (error) {
//     console.error("Error getting game by name:", error);

//     handleErrorResponse(res, 500);
//   }
// }

// async function getNameByGameId(req, res) {
//   const { gameId } = req.params;
//   try {
//     const game = await prisma.game.findUnique({
//       where: {
//         id: parseInt(gameId),
//       },
//     });

//     if (!game) {
//       return handleErrorResponse(res, 404, "Game not found");
//     }

//     res.json({ game });
//   } catch (error) {
//     console.error("Error getting game name by ID:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function countLikesById(req, res) {
//   const { gameId } = req.params;

//   try {
//     const game = await prisma.game.findUnique({
//       where: {
//         id: parseInt(gameId),
//       },
//     });

//     if (!game) {
//       return handleErrorResponse(res, 404, "Game not found");
//     }

//     res.json({ title: game.title, totalLikes: game.totalLikes });
//   } catch (error) {
//     console.error("Error counting likes by ID:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// async function countDislikesById(req, res) {
//   const { gameId } = req.params;

//   try {
//     const game = await prisma.game.findUnique({
//       where: {
//         id: parseInt(gameId),
//       },
//       include: {
//         likes: true, // Include the likes associated with the game
//       },
//     });

//     if (!game) {
//       return handleErrorResponse(res, 404, "Game not found");
//     }

//     const dislikeCount = game.likes.filter(
//       (like) => like.like_status === -1
//     ).length; // Count dislikes
//     res.json({ title: game.title, dislikeCount });
//   } catch (error) {
//     console.error("Error counting dislikes by ID:", error);
//     handleErrorResponse(res, 500);
//   }
// }

// module.exports = {
//   getTopCategories,
//   getGamesByCategory,
//   getGamesBySubcategory,
//   searchGames,
//   getGameByName,
//   getNameByGameId,
//   countLikesById,
//   countDislikesById,
// };
