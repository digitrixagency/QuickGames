import React from "react";
import "./Home.css"
// import Navbar from "../Navbar/Navbar";
import MiniDrawer from "../sideBar/Sidebar";
// import Dashhboard from "../dashboard/Dashboard";
import GameCategorySec from "../gameType/Gamecategory";
import { group1, group2 } from "../../editableFiles/gameHubs";
import GameCard from "../gamecard/GameCard";
import DashBoardSlider1 from "../DashBoardSlider/DashBoardSlider";
//  import { Footer1 } from "../Footer/footer";
import game1 from '../DashBoardSlider/game1.webp'
import game2 from '../DashBoardSlider/game2.webp'
import game3 from '../DashBoardSlider/game3.webp'
import game4 from '../DashBoardSlider/game4.webp'
import CardScrolling from "../../CardScrolling/CardScrolling";
import GamePage from "../GamePage/GamePage";
import GameCategoryPage from "../GameCategory/gamecategorypage";
import LongCardScrolling from "../../CardScrolling/LongCardScrolling";
import DynamicCardScrolling from "../../CardScrolling/DynamicCard";

const cards = [
    { title: 'Image 1', des: 'sd', imageSrc: game1 },
    { title: 'Image 2', des: 'asd', imageSrc: game2 },
    { title: 'Image 1', des: 'sd', imageSrc: game3 },
    { title: 'Image 2', des: 'asd', imageSrc: game4 }
    // Add more cards as needed
];


const Home = () => {
    return (
        <>
            <div className="home">
                {/* <Navbar /> */}

                <DashBoardSlider1 cards={cards} />
                {/* <DynamicCardScrolling GameData={group1} GameDataName={"Group1"}/> */}
                <CardScrolling GameData={group1} GameDataName={"Group1"} />
                <LongCardScrolling GameData={group1} GameDataName={"LongCard"} />
                <CardScrolling GameData={group2} GameDataName={"Group1"} />
                <CardScrolling GameData={group1} GameDataName={"Group1"} />
                <CardScrolling GameData={group2} GameDataName={"Group1"} />
                <LongCardScrolling GameData={group1} GameDataName={"LongCard"} />
                <div style={{ display: "flex", flexDirection: "row" ,height:"200px"}}>
                    <div className="mydiv">Group1</div>
                    <div class="grid-container">
                        <div class="mydiv1">Group2</div>
                        <div class="mydiv1">Group2</div>
                        <div class="mydiv1">Group2</div>
                        <div class="mydiv1">Group2</div>
                    </div>
                    <div className="mydiv">Group3</div>
                </div>
                <div className="copiedDash">


                </div>
                <GameCategorySec />
                {/* 
               
                  
                  <GamePage GameData={group1}/> */}




            </div>

        </>
    );
}

export default Home;