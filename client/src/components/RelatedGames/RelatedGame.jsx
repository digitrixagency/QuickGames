import React from "react";
import "./RelatedGame.css"


const UserRecentPlayed = ({ game }) => {
    return (
        <div className="UserRecentPlayed"
            
        >
            {/* <h1 className="Your-might-like">You Might Like this games</h1> */}
            <section className="main-section">

                {
                    game.map((game, index) => (
                        <div key={index} className="card">
                            <img
                                className="card-img"
                                src={game.image.game1}
                                alt={game.name}
                            />
                        </div>
                    ))
                }
            </section>
        </div>
    );
}

export default UserRecentPlayed;