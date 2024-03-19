import React from "react";
import GameCard from "../gamecard/GameCard";
import "./Dashboard.css"

const Dashhboard = () => {
    return(
        <>
            <div className="dashboard">
                <GameCard/>
            </div>
        </>
    );
}
    
export default Dashhboard;