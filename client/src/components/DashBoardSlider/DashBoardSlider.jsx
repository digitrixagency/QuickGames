
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import DashBoardCard from './DashBoardCard';

import { getdashboardGames } from '../../middleware/games';
import { useState,useRef,useEffect } from "react";
import { userState } from "../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DashBoardSlider1 = ({ cards }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {dashboardTopgame} = useSelector((state)=>state.user);


  useEffect(() => {
   const fetchtopdashboardgame=async()=>{
    await getdashboardGames(dispatch);
   }
   fetchtopdashboardgame();
  }, []);

  const submithandler=(title)=>{
    navigate(`/game/${title}`);
  }
  return (
    <Carousel
      autoPlay={true}

      animation="slide"
      interval="5000"
      
      indicators={false}
      navButtonsAlwaysVisible={false}
    
    

    >
      {dashboardTopgame.map((card, index) => (
        
      
         <DashBoardCard key={index} spotlightno={index+1} title={card.title} des={card.description} imageSrc={card.image_url} submithandle={()=>submithandler(card.title)} />
      ))}
    </Carousel>
  );
};

export default DashBoardSlider1; 