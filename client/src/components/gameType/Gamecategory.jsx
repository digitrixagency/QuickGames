import React from "react";
import "./GameCategory.css"
import CategoryCard from "./GameCategoryCard";

const GameCategorySec = () => {
    return (
        <div className="game-category-sec">
            <div className="about-game">
                <h3>About CrazyGames</h3>
                <p>CrazyGames features the latest and best free online games. You can enjoy playing fun games without interruptions from downloads, intrusive ads, or pop-ups. Just load up your favorite games instantly in your web browser and enjoy the experience.</p>
            </div>
            <div className="game-category">
                <CategoryCard/>
            </div>
        </div>
    );
}

export default GameCategorySec;

