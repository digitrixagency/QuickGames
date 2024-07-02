import React, { useEffect, useRef, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import "./GamePage.css";
import UserRecentPlayed from "../RelatedGames/RelatedGame";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userState, fetchGameStatus } from "../../slice/userSlice";
import {
  addFavourite,
  dislikeGame,
  likeGame,
  removeFavourite,
} from "../../middleware/userAction";
import FavRelatedGame from "../RelatedGames/FavRelatedGame";
import { getGamesByName } from "../../middleware/games";
import { fetchcategory } from "../../middleware/category";

const GamePage = () => {
  const { state } = useLocation();
  const { title } = useParams();
  const gameTitle = title;
  const [GameData, setGameData] = useState(state ? state.GameData : null);
  const [game, setGame] = useState(state ? state.game : null);
  const [loading, setLoading] = useState(!state);

  // console.log(game);

  const iframeRef = useRef(null);

  const userStates = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [favorited, setFavorited] = useState(false);

  //     useEffect(() => {

  //             const fetchGame = async () => {
  //                 try {
  //                     console.log(title);

  //                   await getGamesByName(title,setGame,dispatch)

  //                     setGame(userStates.selectedgame);

  //                     setLoading(false);
  //                 } catch (error) {

  //                     console.error('Error fetching game details:', error);
  //                     setLoading(false);
  //                 }
  //             };
  //             fetchGame();

  //     }, [ title,dispatch,state]);
  //     // console.log(userStates.isLoggedIn); true
  //     useEffect(() => {

  //         setGame(userStates.selectedgame);
  //         const data1 = {
  //             category: userStates.selectedgame.category,

  //           };
  // const fetchsimilargame=async()=>{
  //     await fetchcategory(data1,dispatch);
  // }

  // fetchsimilargame();

  //     }, [dispatch,userStates.selectedgame]);
  //     useEffect(() => {

  //         setGameData(userStates.selectedGames);

  //     }, [dispatch, userStates.selectedGames]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Fetch game details
        await getGamesByName(title, setGame, dispatch);
        setLoading(false); // Update loading state after game details are fetched
      } catch (error) {
        console.error("Error fetching game details:", error);
        setLoading(false);
      }
    };

    // Call the function to fetch game details
    fetchGameDetails();
  }, [title, dispatch, setGame]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch category data for selected game
        const data1 = {
          category: userStates.selectedgame.category,
        };
        await fetchcategory(data1, dispatch);

        // Update selected games data after fetching category
        setGameData(userStates.selectedGames);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    // Call the function to fetch category data
    if (userStates.selectedgame.category) {
      fetchCategoryData();
    }
  }, [
    userStates.selectedgame.category,
    dispatch,
    setGameData,
    userStates.selectedGames,
  ]);

  useEffect(() => {
    setGameData(userStates.selectedGames);
  }, [userStates.selectedGames]);
  useEffect(() => {
    if (userStates.isLoggedIn) {
      // console.log(userStates);
      dispatch(fetchGameStatus(game.id));
      // console.log(userStates);
    }
  }, [dispatch, game, userStates.isLoggedIn]);

  useEffect(() => {
    if (userStates.gameStatus) {
      // console.log(userStates.gameStatus.like_status);
      // console.log(userStates.gameStatus.favorited);

      setLiked(userStates.gameStatus.like_status === 1);
      setDisliked(userStates.gameStatus.like_status === -1);
      setFavorited(userStates.gameStatus.favorited);
    }
  }, [userStates.gameStatus]);

  const handleLike = () => {
    if (!userStates.isLoggedIn) return;
    setLiked(true);
    setDisliked(false);
    dispatch(likeGame(game.id));
  };

  const handleDislike = () => {
    if (!userStates.isLoggedIn) return;
    setLiked(false);
    setDisliked(true);
    dispatch(dislikeGame(game.id));
  };

  const handleFavorite = () => {
    if (!userStates.isLoggedIn) return;
    if (favorited) {
      dispatch(removeFavourite(game.id));
      setFavorited(false);
    } else {
      dispatch(addFavourite(game.id));
      setFavorited(true);
    }
  };

  const toggleFullScreen = () => {
    const iFrame = iframeRef.current;

    if (!iFrame) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      iFrame.requestFullscreen().catch((err) => {
        console.log(`Error full-screen mode : ${err.message}`);
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="Gamepage-cointainer">
        <div className="main-game-page">
          <div className="game-box">
            <iframe
              ref={iframeRef}
              className="game"
              src={game.game_url}
            ></iframe>
          </div>
          <div className="screen-mode-div">
            {liked ? (
              <ThumbUpIcon
                fill
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleLike}
              />
            ) : (
              <ThumbUpOffAltIcon
                fill
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleLike}
              />
            )}

            {disliked ? (
              <ThumbDownIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleDislike}
              />
            ) : (
              <ThumbDownOffAltIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleDislike}
              />
            )}

            {favorited ? (
              <FavoriteIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleFavorite}
              />
            ) : (
              <FavoriteBorderIcon
                style={{ cursor: "pointer", marginRight: "10px" }}
                color="primary"
                onClick={handleFavorite}
              />
            )}

            <FullscreenIcon
              style={{ cursor: "pointer", marginRight: "10px" }}
              color="primary"
              fontSize="large"
              onClick={toggleFullScreen}
            />
          </div>
          <div className="game-descriptions">
            <h1>{game.title}</h1>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Rating:
              </text>
              <text>{game.rating}(14,431 votes)</text>
            </div>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Developer:
              </text>
              <text>No Data</text>
            </div>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Released:
              </text>
              <text>{game.lunch_year}</text>
            </div>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Technology:
              </text>
              <text>{game.technology}</text>
            </div>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Platforms:
              </text>
              <text>
                Browser (desktop, mobile, tablet), App Store(iOS, Android)
              </text>
            </div>
            <div className="decription-table">
              <text
                style={{ width: "20%", color: "#929aab", fontSize: "16px" }}
              >
                Classification:
              </text>
              <text>Games»Casual»Driving»Car</text>
            </div>

            <hr style={{ margin: "10px 0px" }} />

            <div className="description-para">{game.description}</div>

            <h3
              style={{
                marginBlock: "16.38px",
                fontFamily: "Nunito, Arial, Helvetica, sans-serif",
                fontWeight: 900,
                color: "rgb(255, 255, 255)",
              }}
            >
              Release Date
            </h3>
            <ul
              style={{
                boxSizing: "border-box",
                listStyleType: "circle",
                paddingLeft: "20px",
              }}
            >
              <li style={{ boxSizing: "border-box" }}>
                September 2021 (Android and iOS)
              </li>
              <li style={{ boxSizing: "border-box" }}>July 2023 (WebGL)</li>
            </ul>
            <h3
              style={{
                marginBlock: "16.38px",
                fontFamily: "Nunito, Arial, Helvetica, sans-serif",
                fontWeight: 900,
                color: "rgb(255, 255, 255)",
              }}
            >
              Developer
            </h3>
            <p
              style={{
                marginBlockEnd: 0,
                marginBlockStart: 0,
                boxSizing: "border-box",
              }}
            >
              Boombit developed Jump Into The Plane.
            </p>
            <h3
              style={{
                marginBlock: "16.38px",
                fontFamily: "Nunito, Arial, Helvetica, sans-serif",
                fontWeight: 900,
                color: "rgb(255, 255, 255)",
              }}
            >
              Platforms
            </h3>
            <ul
              style={{
                boxSizing: "border-box",
                listStyleType: "circle",
                paddingLeft: "20px",
              }}
            >
              <li style={{ boxSizing: "border-box" }}>
                Web browser (desktop and mobile)
              </li>
              <li style={{ boxSizing: "border-box" }}>Android</li>
            </ul>
          </div>
        </div>
        <div className="related-game-page">
          {/* user recently played */}
          <FavRelatedGame game={GameData} />
        </div>
      </div>
      <div className="related-game-pagelower">
        {/* related game data i.e. category data */}
        <UserRecentPlayed game={GameData} />
      </div>
    </>
  );
};

export default GamePage;
