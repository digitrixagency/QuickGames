
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import DashBoardCard from './DashBoardCard';


const DashBoardSlider1 = ({ cards }) => {
  return (
    <Carousel
      autoPlay={true}

      animation="slide"
      interval="5000"
      
      indicators={false}
      navButtonsAlwaysVisible={false}
    
    

    >
      {cards.map((card, index) => (
      
         <DashBoardCard key={index} spotlightno={index+1} title={card.title} des={card.dess} imageSrc={card.imageSrc} />
      ))}
    </Carousel>
  );
};

export default DashBoardSlider1; 