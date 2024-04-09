import React from "react";
import "./Home.css"
// import Navbar from "../Navbar/Navbar";
import MiniDrawer from "../sideBar/Sidebar";
// import Dashhboard from "../dashboard/Dashboard";
import GameCategorySec from "../gameType/Gamecategory";
import { group1, group2 } from "../../editableFiles/gameHubs";
import GameCard from "../gamecard/GameCard";
import { DashBoardSlider } from "../DashBoardSlider/DashBoardSlider";
 import { Footer1 } from "../Footer/footer";

const Home =()=>{
    return (
        <>
            <div className="home">
                {/* <Navbar /> */}
                <MiniDrawer/>
                {/* <DashBoardSlider/> */}
                {/* <div className="copiedDash">
             <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>
                <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>
                <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/> 
                // <GameCategorySec/>
                </div> */}
               
                  <Footer1/>
                
            </div>
            
        </>
    );
}

export default Home;