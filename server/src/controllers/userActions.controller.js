import { PrismaClient } from "@prisma/client";
import { handleErrorResponse } from "../errorResponses.js";

const prisma = new PrismaClient();

const AddFavourite = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = req.body; // Assuming user_id is passed in the request body

        const alreadyAdded = await prisma.favoriteGame.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        if (alreadyAdded) {
            return handleErrorResponse(res, 429, "already added to favourite");
        }

        const addToFav = await prisma.favoriteGame.create({
            data: {
                user_id: user_id,
                game_id: parseInt(gameId)
            }
        });

        if (!addToFav) {
            handleErrorResponse(res, 501, "Unable to add to favourite");
        }

        return res.status(200).json({
            data: addToFav,
            message: "Added to Favourite Games"
        });
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
}

const RemoveFavourite = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = req.body; // Assuming user_id is passed in the request body

        const alreadyAdded = await prisma.favoriteGame.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        if (!alreadyAdded) {
            return handleErrorResponse(res, 429, "Unable to remove from favourite");
        }

        const removeFav = await prisma.favoriteGame.delete({
            where: {
                user_id_game_id: {
                    user_id: user_id,
                    game_id: parseInt(gameId)
                }
            }
        });

        if (!removeFav) {
            return handleErrorResponse(res, 501, "Unable to remove from favourite");
        }

        return res.status(200).json({
            data: removeFav,
            message: "Removed from Favourite Games"
        });
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
};

const LikeGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = req.body; // Assuming user_id is passed in the request body

        const gamePresent = await prisma.like.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        if (gamePresent) {
            const like = await prisma.like.update({
                where: {
                    user_id_game_id: {
                        user_id: user_id,
                        game_id: parseInt(gameId)
                    }
                },
                data: {
                    like_status: 1
                }
            });

            if (!like) {
                return handleErrorResponse(res, 501, "Unable to like");
            }

            const updatedGame = await prisma.game.update({
                where: {
                    id: parseInt(gameId)
                },
                data: {
                    totalLikes: {
                        increment: gamePresent.like_status === -1 ? 1 : 0
                    }
                }
            });

            return res.status(200).json({
                data: like,
                message: "Game is liked",
                game: updatedGame
            });
        }

        const like = await prisma.like.create({
            data: {
                user_id: user_id,
                game_id: parseInt(gameId),
                like_status: 1
            }
        });

        const updatedGame = await prisma.game.update({
            where: {
                id: parseInt(gameId)
            },
            data: {
                totalLikes: {
                    increment: 1
                }
            }
        });

        if (!like) {
            return handleErrorResponse(res, 501, "Unable to like");
        }

        return res.status(200).json({
            data: like,
            message: "Game is liked",
            game: updatedGame
        });
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
};

const DislikeGame = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = req.body; // Assuming user_id is passed in the request body

        const gamePresent = await prisma.like.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        if (gamePresent) {
            const dislike = await prisma.like.update({
                where: {
                    user_id_game_id: {
                        user_id: user_id,
                        game_id: parseInt(gameId)
                    }
                },
                data: {
                    like_status: -1
                }
            });

            if (!dislike) {
                return handleErrorResponse(res, 501, "Unable to dislike");
            }

            const updatedGame = await prisma.game.update({
                where: {
                    id: parseInt(gameId)
                },
                data: {
                    totalLikes: {
                        decrement: gamePresent.like_status === 1 ? 1 : 0
                    }
                }
            });

            return res.status(200).json({
                data: dislike,
                message: "Game is disliked",
                game: updatedGame
            });
        }

        const dislike = await prisma.like.create({
            data: {
                user_id: user_id,
                game_id: parseInt(gameId),
                like_status: -1
            }
        });

        if (!dislike) {
            return handleErrorResponse(res, 501, "Unable to dislike");
        }

        return res.status(200).json({
            data: dislike,
            message: "Game is disliked"
        });
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
};

const getUserLikeOrFavouriteStatus = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = req.body; // Assuming user_id is passed in the request body
        // console.log("fetchingStatus" , gameId, user_id);
        const likeStatus = await prisma.like.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        const favoriteStatus = await prisma.favoriteGame.findFirst({
            where: {
                game_id: parseInt(gameId),
                user_id: user_id
            }
        });

        const status = {
            like_status: likeStatus ? likeStatus.like_status : null,
            favorited: !!favoriteStatus
        };

        return res.status(200).json(status);
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
};

const getFavouriteGamesByUser = async (req, res) => {
    // console.log(1)
    try {
        const { user_id } = req.params; // Assuming user_id is passed as a URL parameter
        
        // const user_id = "3";
        // console.log("getFavouriteGamesByUser :",typeof user_id, user_id)
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

        const favoriteGames = await prisma.favoriteGame.findMany({
            where: {
                user_id: parseInt(user_id)
            },
            include: {
                game: true // Include the game details
            },
            take: Number(limit),
            skip: offset,
            // orderBy: orderBy
        });

        if (!favoriteGames) {
            return handleErrorResponse(res, 404, "No favorite games found for this user");
        }

        return res.status(200).json(favoriteGames);
    } catch (error) {
        console.error(error);
        handleErrorResponse(res, 500);
    }
};

export { AddFavourite, RemoveFavourite, DislikeGame, LikeGame, getUserLikeOrFavouriteStatus, getFavouriteGamesByUser };
