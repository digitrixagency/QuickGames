import React from "react";
import "./RelatedGame.css"
import { useNavigate } from "react-router-dom";


const UserRecentPlayed = ({ game }) => {
    const navigate = useNavigate();
    // const handleGame = (game) => {
    //     const gameTitle = game.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
    //     navigateToThisGame(`/game/${gameTitle}`, { state: { game , GameData } });
    // }
    const handleGameSelection = (selectedGame) => {
        const gameTitle = selectedGame.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
        navigate(`/game/${gameTitle}`, { state: { game: selectedGame, GameData: game } });
    };
    return (
        <div className="UserRecentPlayed"
            
        >
            {/* <h1 className="Your-might-like">You Might Like this games</h1> */}
            <section className="main-section">

                {
                    game.map((game, index) => (
                        <div key={index} className="card" onClick={() => handleGameSelection(game)}>
                            <img
                                className="card-img"
                                src={game.image_url}
                                alt={game.title}
                            />
                        </div>
                    ))
                }
            </section>
        </div>
    );
}

export default UserRecentPlayed;