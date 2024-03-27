import React from "react";
 import GameCard from "../gamecard/GameCard";
import "./Dashboard.css"
// import CardSlider from "../test/tes";
import GameCategorySec from "../GameCategorySec/GameCategorySec";
import {group1} from "../../editableFiles/gamesHubs";
import {group2} from "../../editableFiles/gamesHubs";



const Dashhboard = () => {
    return(
        <>
            <div className="dashboard">
            {/* {console.log(GameStore.group1)} */}
                <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>
                <GameCategorySec/>
                {/* <CardSlider/> */}
            </div>
        </>
    );
}
    
export default Dashhboard;