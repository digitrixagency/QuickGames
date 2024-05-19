import React, { useEffect } from "react";
import "./Home.css"
// import Navbar from "../Navbar/Navbar";
import MiniDrawer from "../sideBar/Sidebar";
// import Dashhboard from "../dashboard/Dashboard";
import GameCategorySec from "../gameType/Gamecategory";
import { group1, group2 } from "../../editableFiles/gameHubs";
import GameCard from "../gamecard/GameCard";
import  DashBoardSlider1  from "../DashBoardSlider/DashBoardSlider";
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
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchTopCategories } from "../../middleware/games";

 const cards = [
    { title: 'Image 1',des:'sd', imageSrc: game1 },
    { title: 'Image 2', des:'asd', imageSrc: game2 },
    { title: 'Image 1',des:'sd', imageSrc: game3},
    { title: 'Image 2', des:'asd', imageSrc: game4 }
    // Add more cards as needed
  ];
  

const Home =()=>{
    const userStates = useSelector(userState);
    const { topCategories } = useSelector((state) => state.user); // top 10 categories data stored here
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchTopCategories());
    }, [dispatch])

    
    // console.log(topCategories[0]?.games[0]?.title);
 
    console.log(topCategories);

    return (
        <>
            <div className="home">
                {/* <Navbar /> */}
                


                 <DashBoardSlider1 cards={cards}/> 

                 {/* <div > */}
                    
                    {topCategories && topCategories.length > 0 ? (
                        topCategories?.map((category,index) => (
                            <div key={index}>
                            <CardScrolling GameData={category.games} GameDataName={category.category}/>
    
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                {/* </div> */}

                 {/* <DynamicCardScrolling GameData={group1} GameDataName={"Group1"}/> */}
                 {/* <CardScrolling GameData={group1} GameDataName={"Group1"}/>
                 <LongCardScrolling GameData={group1} GameDataName={"LongCard"} />
                 <CardScrolling GameData={group2} GameDataName={"Group1"}/>
                 <CardScrolling GameData={group1} GameDataName={"Group1"}/>
                 <CardScrolling GameData={group2} GameDataName={"Group1"}/>
                 <LongCardScrolling GameData={group1} GameDataName={"LongCard"} /> */}
                 <div className="copiedDash">
              
                 
                </div>
                <GameCategorySec/> 
                 {/* 
               
                  
                  <GamePage GameData={group1}/> */}
            </div>
            
        </>
    );
}

export default Home;