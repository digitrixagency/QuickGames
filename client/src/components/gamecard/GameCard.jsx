import React, { useState } from "react";
import "./GameCard.css"
// import images1 from "../../images/testImage/game1.webp"
// import GameDataTest from "../../editableFiles/testGameObj";
// import GameHubsWithCategories from "../../editableFiles/gameHubs";

const GameCard = ({GameData, GameDataName}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const cardWidth = 1000;

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
                        {GameDataName}
                        {/* {console.log(GameStore)} */}
                    </p>
                    <p className="view-more">view more...</p>
                </div>


                <div className="game-card-container">


                    <div className="left-arrow" onClick={handleLeftArrowClick}>
                        <i class="arrow left"></i>
                    </div>
                    

                    
                    <div className="game-list-container">
                        <div className="game-card-list" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                        
                            {GameData.map((game, index) => (
                                <div key={index} className="game-card">
                                    <img className="card-img" src={game.image.game1} alt={game.name} />
                                </div>
                            ))}
                        </div>
                    </div>
                   
                    <div className="right-arrow" onClick={handleRightArrowClick}>
                        <i class="arrow right"></i>
                    </div>

                </div>
            </div>
    );
}

export default GameCard;



// import React, { useState, useEffect } from "react";
// import "./GameCard.css";
// import GameDataTest from "../../editableFiles/testGameObj";
// import GameHubsWithCategories from "../../editableFiles/gameHubs";

// const GameCard = () => {
//     const [scrollPositions, setScrollPositions] = useState({});

//     const cardWidth = 250; // Adjust according to your design

//     const handleLeftArrowClick = (category) => {
//         setScrollPositions(prevScrollPositions => ({
//             ...prevScrollPositions,
//             [category]: Math.max(0, prevScrollPositions[category] - cardWidth)
//         }));
//     };

//     const handleRightArrowClick = (category) => {
//         const containerWidth = document.querySelector(`.game-card-container.${category}`)?.offsetWidth;
//         const totalWidth = document.querySelector(`.game-card-list.${category}`)?.scrollWidth;
//         if (containerWidth && totalWidth) {
//             setScrollPositions(prevScrollPositions => ({
//                 ...prevScrollPositions,
//                 [category]: Math.min(prevScrollPositions[category] + cardWidth, totalWidth - containerWidth)
//             }));
//         }
//     };

//     useEffect(() => {
//         const handleResize = () => {
//             // Reset scroll position on window resize
//             setScrollPositions({});
//         };

//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     return (
//         <>
//             {GameHubsWithCategories.map((data, index) => (
//                 <div key={index} className="game-card-component">
//                     <div className="category-container">
//                         <p className="category-name">{data.category}</p>
//                         <p className="view-more">view more...</p>
//                     </div>
//                     <div className={`game-card-container ${data.category}`}>
//                         <div className="left-arrow" onClick={() => handleLeftArrowClick(data.category)}>
//                             <i className="arrow left"></i>
//                         </div>
//                         <div className={`game-list-container ${data.category}`}>
//                             <div className={`game-card-list ${data.category}`} style={{ transform: `translateX(-${scrollPositions[data.category] || 0}px)` }}>
//                                 {data.games.map((game, index) => (
//                                     <div key={index} className="game-card">
//                                         <img className="card-img" src={game.image.game1} alt={game.name} />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className="right-arrow" onClick={() => handleRightArrowClick(data.category)}>
//                             <i className="arrow right"></i>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// }

// export default GameCard;

