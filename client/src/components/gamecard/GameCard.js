import React, { useState } from "react";
import "./GameCard.css"
// import images1 from "../../images/testImage/game1.webp"
import GameDataTest from "../../editableFiles/testGameObj";

const GameCard = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardWidth = 100; // Adjust according to your design

    const handleLeftArrowClick = () => {
        setScrollPosition(Math.max(0, scrollPosition - cardWidth));
    };

    const handleRightArrowClick = () => {
        const containerWidth = document.querySelector(".game-card-container").offsetWidth;
        const totalWidth = document.querySelector(".game-card-list").scrollWidth;
        setScrollPosition(Math.min(scrollPosition + cardWidth, totalWidth - containerWidth));
    };
    return (
        <div className="game-card-component">
            <div className="category-cointainer">
                <p className="category-name">
                    Recent Game
                </p>
                <p className="view-more">view more...</p>
            </div>


            <div className="game-card-container">
                <div className="left-arrow" onClick={handleLeftArrowClick}>
                    <i class="arrow left"></i>
                </div>
                <div className="game-card-list" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                {GameDataTest.map((game, index) => (
                    <div key={index} className="game-card">
                        <img className="card-img" src={game.image.game1} alt={game.name} />
                    </div>
                ))}
                </div>
                <div className="right-arrow" onClick={handleRightArrowClick}>
                    <i class="arrow right"></i>
                </div>
                
            </div>
        </div>
    );
}

export default GameCard;