import { PrismaClient } from "@prisma/client";
import { handleErrorResponse } from "../errorResponses.js";

const prisma = new PrismaClient();

const AddFavourite = async (req, res) =>{
    try {
        // const {gameId} = req.params;
        // const {user_id} = 1;
        const gameId = 77;
        const user_id = 1 ;

        const alreadyAdded = await prisma.favoriteGame.findFirst({
            where:{
                game_id: gameId,
                user_id: user_id
            }
        })

        if(alreadyAdded){
            return handleErrorResponse(res,429, "already added to favourite")
        }

        const addToFav = await prisma.favoriteGame.create({
            data:{
                user_id: user_id,
                game_id: gameId
            }
        })
        if(!addToFav){
            handleErrorResponse(res,501, "Unable to add to favourite");
        }

        return res.status(200).json({
            data : addToFav,
            message:"Added to Favourite Games"
        })
    } catch (error) {
        console.error(error);
        handleErrorResponse(res,500);
    }
}

const RemoveFavourite = async (req, res) => {
    try {
        // These would typically come from req.params or req.body
        const gameId = 77; // Replace with actual value from req.params or req.body
        const user_id = 1; // Replace with actual value from req.params or req.body

        // Check if the favoriteGame exists
        const alreadyAdded = await prisma.favoriteGame.findFirst({
            where: {
                game_id: gameId,
                user_id: user_id
            }
        });

        if (!alreadyAdded) {
            return handleErrorResponse(res, 429, "Unable to remove from favourite");
        }

        // Delete the favoriteGame using the composite key
        const removeFav = await prisma.favoriteGame.delete({
            where: {
                user_id_game_id: {
                    user_id: user_id,
                    game_id: gameId
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



const DislikeGame = async (req, res) => {
    try {
        // const { gameId } = req.params;
        // const { user_id } = req.locals.userData;
        const gameId = 77;
        const user_id = 1 ;

        const gamePresent = await prisma.like.findFirst({
            where: {
                game_id: gameId,
                user_id: user_id
            }
        });

        if (gamePresent) {
            const dislike = await prisma.like.update({
                where: {
                    user_id_game_id: {
                        user_id: user_id,
                        game_id: gameId
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
                    id: gameId
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
                game_id: gameId,
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

const LikeGame = async (req, res) => {
    
    try {
        // const { gameId_string } = req.params;
        // const gameId = parseInt(gameId_string, 10);
        // console.log("gameId "+(gameId)+ " " + typeof gameId)

        const gameId = 77;
        const  user_id  = 1;
        // console.log(user_id)
        const gamePresent = await prisma.like.findFirst({
            where: {
                game_id: gameId,
                user_id: user_id
            }
        });

        if (gamePresent) {
            const like = await prisma.like.update({
                where: {
                    user_id_game_id: {
                        user_id: user_id,
                        game_id: gameId
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
                    id: gameId
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
                game_id: gameId,
                like_status: 1
            }
        });

        const updatedGame = await prisma.game.update({
            where: {
                id: gameId
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

const getUserLikeOrFavouriteStatus = async (req, res) => {
    try {
        const { gameId } = req.params;
        const { user_id } = 1;

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


export { AddFavourite, RemoveFavourite, DislikeGame, LikeGame, getUserLikeOrFavouriteStatus };
