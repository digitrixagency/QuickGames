import React, { useEffect } from "react";
import "./RelatedGame.css";
import HoverVideoPlayer from "react-hover-video-player";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../slice/userSlice";
import { getMyfavouriteGames } from "../../middleware/userAction";



const FavRelatedGame = ({ game }) => {
    const [page, setPage] = React.useState(1);
    const [filter, setfilter] = React.useState('new');
    const navigate = useNavigate();
    const userStates = useSelector(userState);
    const dispatch = useDispatch();
    
    // const handleGame = (game) => {
    //     const gameTitle = game.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
    //     navigateToThisGame(`/game/${gameTitle}`, { state: { game , GameData } });
    // }
    const handleGameSelection = (selectedGame) => {
        const gameTitle = selectedGame.title; // Convert title to URL-friendly format
        navigate(`/game/${gameTitle}`);
    };

    useEffect(() => {
        const fetchFavData = async () => {
          const data = {
            category: "Favourite Game",
            limit: 63,
            page: page,
            filter: filter,
            user_id: 1,
          }
          
          
          await getMyfavouriteGames(data, dispatch);
          
        };
    
        // fetchData(); // Call the async function immediately;
        fetchFavData();
    
        // console.log(userStates.FavouriteGames)
      }, [dispatch, filter, page]);
    return (
        <div className="UserRecentPlayed"
            
        >
            {/* <h1 className="Your-might-like">You Might Like this games</h1> */}
            {
                userStates.favouriteGames.length >=1 ? <section className="main-section">
            
            {
                userStates.favouriteGames.slice(0,22).map((game, index) => (
                    <div key={index} className="card" onClick={() => handleGameSelection(game.game)}>
                        {/* <img
                            className="card-img"
                            src={game.image_url}
                            alt={game.title}
                        /> */}
                        <HoverVideoPlayer

                                // videoSrc={game.game.video_url}
                                videoSrc="https://ia800400.us.archive.org/3/items/games-videos/10%20Mahjong.mp4"

                                pausedOverlay={
                                    <img
                                        src={game.game.image_url}
                                        alt="this is img"
                                        style={{
                                            // Make the image expand to cover the video's dimensions
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '10px',
                                        }}
                                    />
                                }
                                videoStyle={{
                                    // Make the video expand to cover the container's dimensions
                                    width: '400px',
                                    height: '130px',
                                    objectFit: 'fill',
                                    borderRadius: '10px',
                                }}
                                onClick={() => handleGameSelection(game.game)}

                            />
                    </div>
                ))
            }
        </section>
         :
         <section className="main-section">
            
                {
                    game.slice(0,22).map((game, index) => (
                        <div key={index} className="card" onClick={() => handleGameSelection(game)}>
                            {/* <img
                                className="card-img"
                                src={game.image_url}
                                alt={game.title}
                            /> */}
                            <HoverVideoPlayer

                                    // videoSrc={game.video_url}
                                    videoSrc="https://ia800400.us.archive.org/3/items/games-videos/10%20Mahjong.mp4"

                                    pausedOverlay={
                                        <img
                                            src={game.image_url}
                                            alt="this is img"
                                            style={{
                                                // Make the image expand to cover the video's dimensions
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    }
                                    videoStyle={{
                                        // Make the video expand to cover the container's dimensions
                                        width: '400px',
                                        height: '130px',
                                        objectFit: 'fill',
                                        borderRadius: '10px',
                                    }}
                                    onClick={() => handleGameSelection(game)}

                                />
                        </div>
                    ))
                }
            </section>
            }
            
        </div>
    );
}

export default FavRelatedGame;