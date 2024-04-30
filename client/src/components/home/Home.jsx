import React from "react";
import "./Home.css"
// import Navbar from "../Navbar/Navbar";
import MiniDrawer from "../sideBar/Sidebar";
// import Dashhboard from "../dashboard/Dashboard";
import GameCategorySec from "../gameType/Gamecategory";
import { group1, group2 } from "../../editableFiles/gameHubs";
import GameCard from "../gamecard/GameCard";
import  DashBoardSlider1  from "../DashBoardSlider/DashBoardSlider";
 import { Footer1 } from "../Footer/footer";
 import game1 from '../DashBoardSlider/game1.webp'
 import game2 from '../DashBoardSlider/game2.webp'
 import game3 from '../DashBoardSlider/game3.webp'
 import game4 from '../DashBoardSlider/game4.webp'
import CardScrolling from "../../CardScrolling/CardScrolling";


 const cards = [
    { title: 'Image 1',des:'sd', imageSrc: game1 },
    { title: 'Image 2', des:'asd', imageSrc: game2 },
    { title: 'Image 1',des:'sd', imageSrc: game3},
    { title: 'Image 2', des:'asd', imageSrc: game4 }
    // Add more cards as needed
  ];
  

const Home =()=>{
    return (
        <>
            <div className="home">
                {/* <Navbar /> */}
                <MiniDrawer/>
                 <DashBoardSlider1 cards={cards}/> 

                 <CardScrolling GameData={group1} GameDataName={"Group1"}/>
                 <CardScrolling GameData={group2} GameDataName={"Group1"}/>
                 <CardScrolling GameData={group1} GameDataName={"Group1"}/>
                 <CardScrolling GameData={group2} GameDataName={"Group1"}/>
                <div className="copiedDash">
                 
             {/* <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>
                <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>
                <GameCard GameData={group1} GameDataName={"Group1"}/>
                <GameCard GameData={group2} GameDataName={"Group2"}/>  */}
                 
                </div>
                <GameCategorySec/>
               
                  <Footer1/>
                
            </div>
            
        </>
    );
}

export default Home;