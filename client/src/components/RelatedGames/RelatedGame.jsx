import React from "react";
import "./RelatedGame.css"


const UserRecentPlayed = ({ game }) => {

    // const handleGame = (game) => {
    //     const gameTitle = game.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
    //     navigateToThisGame(`/game/${gameTitle}`, { state: { game , GameData } });
    // }
    return (
        <div className="UserRecentPlayed"
            
        >
            {/* <h1 className="Your-might-like">You Might Like this games</h1> */}
            <section className="main-section">

                {
                    game.map((game, index) => (
                        <div key={index} className="card" >
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