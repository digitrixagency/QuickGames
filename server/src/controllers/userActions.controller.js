import { PrismaClient } from "@prisma/client";
import { handleErrorResponse } from "../errorResponses.js";

const prisma = new PrismaClient();

const AddFavourite = async (req, res) =>{
    try {
        const {gameId} = req.params;
        const {user_id} = req.locals.userData;

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

const RemoveFavourite = async (req, res) =>{
    try {
        const {gameId} = req.params;
        const {user_id} = req.locals.userData;

        const alreadyAdded = await prisma.favoriteGame.findFirst({
            where:{
                game_id: gameId,
                user_id: user_id
            }
        })

        if(!alreadyAdded){
            return handleErrorResponse(res,429, "Unable to remove from favourite")
        }

        const removeFav = await prisma.favoriteGame.delete({
            where:{
                user_id: user_id,
                game_id: gameId
            }
        })
        if(!removeFav){
            handleErrorResponse(res,501, "Unable to remove from favourite");
        }

        return res.status(200).json({
            data : removeFav,
            message:"Remove from Favourite Games"
        })
    } catch (error) {
        console.error(error);
        handleErrorResponse(res,500);
    }
}
const DislikeGame = async (req, res) =>{
    try {
        const {gameId} = req.params;
        const {user_id} = req.locals.userData;

        const gamePresent = await prisma.like.findFirst({
            where:{
                game_id: gameId,
                user_id: user_id
            }
        })

        if(gamePresent){
            const dislike = await prisma.like.update({
                where:{
                    game_id: gameId,
                    user_id : user_id,
                },
                data:{
                    like_status: -1,
                }
            })

            if(!dislike){
                handleErrorResponse(res,501, "Unable to dislike");
            }

            return res.status(200).json({
                data : dislike,
                message:"Game is disliked"
            })
        }

        const dislike = await prisma.like.create({
            data:{
                user_id: user_id,
                game_id: gameId,
                like_status: -1,
            }
        })
        if(!dislike){
            handleErrorResponse(res,501, "Unable to dislike");
        }

        return res.status(200).json({
            data : dislike,
            message:"Game is Disliked"
        })
    } catch (error) {
        console.error(error);
        handleErrorResponse(res,500);
    }
}

export { AddFavourite, RemoveFavourite, DislikeGame };


// const { PrismaClient } = require("@prisma/client");
// const { handleErrorResponse } = require("../errorResponses");

// const prisma = new PrismaClient();

// const AddFavourite = async (req, res) =>{
//     try {
//         const {gameId} = req.params;
//         const {user_id} = req.locals.userData;

//         const alreadyAdded = await prisma.favoriteGame.findFirst({
//             where:{
//                 game_id: gameId,
//                 user_id: user_id
//             }
//         })

//         if(alreadyAdded){
//             return handleErrorResponse(res,429, "already added to favourite")
//         }

//         const addToFav = await prisma.favoriteGame.create({
//             data:{
//                 user_id: user_id,
//                 game_id: gameId
//             }
//         })
//         if(!addToFav){
//             handleErrorResponse(res,501, "Unable to add to favourite");
//         }

//         return res.status(200).json({
//             data : addToFav,
//             message:"Added to Favourite Games"
//         })
//     } catch (error) {
//         console.error(error);
//         handleErrorResponse(res,500);
//     }
// }

// const RemoveFavourite = async (req, res) =>{
//     try {
//         const {gameId} = req.params;
//         const {user_id} = req.locals.userData;

//         const alreadyAdded = await prisma.favoriteGame.findFirst({
//             where:{
//                 game_id: gameId,
//                 user_id: user_id
//             }
//         })

//         if(!alreadyAdded){
//             return handleErrorResponse(res,429, "Unable to remove from favourite")
//         }

//         const removeFav = await prisma.favoriteGame.delete({
//             where:{
//                 user_id: user_id,
//                 game_id: gameId
//             }
//         })
//         if(!removeFav){
//             handleErrorResponse(res,501, "Unable to remove from favourite");
//         }

//         return res.status(200).json({
//             data : removeFav,
//             message:"Remove from Favourite Games"
//         })
//     } catch (error) {
//         console.error(error);
//         handleErrorResponse(res,500);
//     }
// }
// const DislikeGame = async (req, res) =>{
//     try {
//         const {gameId} = req.params;
//         const {user_id} = req.locals.userData;

//         const gamePresent = await prisma.like.findFirst({
//             where:{
//                 game_id: gameId,
//                 user_id: user_id
//             }
//         })

//         if(gamePresent){
//             const dislike = await prisma.like.update({
//                 where:{
//                     game_id: gameId,
//                     user_id : user_id,
//                 },
//                 data:{
//                     like_status: -1,
//                 }
//             })

//             if(!dislike){
//                 handleErrorResponse(res,501, "Unable to dislike");
//             }

//             return res.status(200).json({
//                 data : dislike,
//                 message:"Game is disliked"
//             })
//         }

//         const dislike = await prisma.like.create({
//             data:{
//                 user_id: user_id,
//                 game_id: gameId,
//                 like_status: -1,
//             }
//         })
//         if(!dislike){
//             handleErrorResponse(res,501, "Unable to dislike");
//         }

//         return res.status(200).json({
//             data : dislike,
//             message:"Game is Disliked"
//         })
//     } catch (error) {
//         console.error(error);
//         handleErrorResponse(res,500);
//     }
// }