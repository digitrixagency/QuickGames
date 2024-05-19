import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from 'react-youtube';
import HoverVideoPlayer from 'react-hover-video-player';
import "./CardScrolling.css";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'gray',
                opacity: '0.5',
                height: '95%',
                right: '0px',
                // top:'94p%',
                width: '25px',
            }}
        >
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="black"
                height="24"
                viewBox="0 0 512 512"
                width="24"
            >
                <path d="M272 464.4L456.4 280 272 95.6 272 192 144 192 144 320 272 320z" />
            </svg> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
            ><path d="m11.707 3.293-1.414 1.414L17.586 12l-7.293 7.293 1.414 1.414L20.414 12l-8.707-8.707z" /><path d="M5.707 3.293 4.293 4.707 11.586 12l-7.293 7.293 1.414 1.414L14.414 12 5.707 3.293z" />
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'gray',
                opacity: '0.5',
                height: '95%',
                left: '0px',
                // top:'94p%',
                width: '25px',
                zIndex: '1'
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
            ><path d="m13.707 4.707-1.414-1.414L3.586 12l8.707 8.707 1.414-1.414L6.414 12l7.293-7.293z" /><path d="m19.707 4.707-1.414-1.414L9.586 12l8.707 8.707 1.414-1.414L12.414 12l7.293-7.293z" />
            </svg>
        </div>
    );
};




const CardScrolling = ({ GameData, GameDataName }) => {
    const [ ishovered, setishovered ] = useState(false);
    const [hoveredIndex, setHoverIndex] = useState(-1);
    const navigateToThisGame = useNavigate();

    const handleGameSelection = (gameName) => {
        navigateToThisGame(`this-game-name/`);
    };
    const handleGamegategorySelection = (gameName) => {
        navigateToThisGame(`cardgames/populargame`);
    };

    const handleMouseEnter = (index) => {
        setishovered(true);

        setHoverIndex(index);
    }

    const handleMouseLeave = () => {
        setishovered(false);

        setHoverIndex(-1);
    }

    


    var settings = {
        dots: false,
        speed: 3000,
        slidesToShow: 8,
        slidesToScroll: 3,
        infinite: ishovered,
        // autoplay: true,
        arrows: ishovered,
        autoplaySpeed: 100,
        nextArrow: ishovered ? <NextArrow className="nextArrow" /> : null,

        prevArrow: ishovered ? <PrevArrow className="nextArrow" /> : null,
        responsive: [
            {
                breakpoint: 1110,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 872,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }
        ],

    };

    return (
        <div className="card-scrolling-content">
            {/* <h1 className="card-scrolling-header">{GameDataName}</h1> */}
            <div className="category-cointainer">
                <p className="category-name">
                    {GameDataName}
                    {/* {console.log(GameStore)} */}
                </p>
                <p className="view-more" onClick={handleGamegategorySelection}>view more...</p>
            </div>
            <div className="card-scrolling-container">
                <Slider {...settings}>
                    {GameData.map((game, index) => (
                        <div key={index} onMouseEnter={() => {setishovered(true)}}  onMouseLeave={() => setishovered(false)}>
                            <div className="card-scrolling-img-body" >

                                {/* {renderContent(game, index)} */}
                                <HoverVideoPlayer

                                    videoSrc={game.trailer}

                                    pausedOverlay={
                                        <img
                                            src={game.image.game1}
                                            alt="this is img"
                                            style={{
                                                // Make the image expand to cover the video's dimensions
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'fill',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    }
                                    onClick={() => handleGameSelection(game.name)}

                                />

                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CardScrolling;