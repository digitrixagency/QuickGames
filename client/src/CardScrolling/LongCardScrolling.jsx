import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LongCardSec.css";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}
            style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#000000',
                opacity:'0.5',
                height:'95%',
                right:'0px',
                // top:'94p%',
                width:'25px',
            }}
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" fill="white"
            ><path d="m11.707 3.293-1.414 1.414L17.586 12l-7.293 7.293 1.414 1.414L20.414 12l-8.707-8.707z"/><path d="M5.707 3.293 4.293 4.707 11.586 12l-7.293 7.293 1.414 1.414L14.414 12 5.707 3.293z"/>
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}
          style={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:'#000000',
                opacity:'0.5',
                height:'95%',
                left:'0px',
                // top:'94p%',
                width:'25px',
                zIndex:'1'
            }}
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg"
             width="24" 
             height="24"
             fill="white"
             ><path d="m13.707 4.707-1.414-1.414L3.586 12l8.707 8.707 1.414-1.414L6.414 12l7.293-7.293z"/><path d="m19.707 4.707-1.414-1.414L9.586 12l8.707 8.707 1.414-1.414L12.414 12l7.293-7.293z"/>
            </svg>
        </div>
    );
};


const LongCardScrolling = ({ GameData, GameDataName }) => {
    const [hoveredIndex, setHoverIndex] = useState(-1);
    const navigateToThisGame = useNavigate();

    const handleGameSelection = (gameName) => {
        navigateToThisGame(`this-game-name/`);
    };
    const handleGamegategorySelection = (gameName) => {
        navigateToThisGame(`cardgames/populargame`);
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    }

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    }

 
    const renderContent = (game, index) => {
        const videoId = extractVideoId(game.video_url);


        if (hoveredIndex === index) {
           const url="https://drive.google.com/file/d/1AFx1hQszwDoEILMPl-o7M1hE8T0AUucl/preview"
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`;
            return (
                // <div className="video-container" onMouseLeave={handleMouseLeave}>
                //     <iframe
                //         title={game.name}
                //         src={url}
                //         frameBorder="0"
                //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                //         allowFullScreen
                //         className="video-iframe"
                //     ></iframe>
                // </div>
                <img
                    className="Longcard-img"
                    src={game.image_url}
                    alt={game.title}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleGameSelection(game.title)}
                />
            );
        } else {
            return (
                <img
                    className="Longcard-img"
                    src={game.image_url}
                    alt={game.title}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleGameSelection(game.title)}
                />
            );
        }
    };

    const extractVideoId = (videoUrl) => {
        const urlParams = new URLSearchParams(new URL(videoUrl).search);
        return urlParams.get('v');
    };



    var settings = {
        dots: false,
        speed: 2000,
        slidesToShow: 10,
        slidesToScroll: 3,
        infinite: true,
        // autoplay: true,
        autoplaySpeed: 100,
        nextArrow: <NextArrow className="nextArrow"/>,

        prevArrow: <PrevArrow className="nextArrow"/>,
        responsive: [
            {
                breakpoint: 1110,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: -3
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: -3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: -2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: -1
                }
            }
        ],

    };

    return (
        <div className="Longcard-scrolling-content">
            {/* <h1 className="card-scrolling-header">{GameDataName}</h1> */}
            <div className="category-cointainer">
                <p className="category-name"
                style={{
                    paddingLeft:'0px'
                }}>
                    {GameDataName}
                    {/* {console.log(GameStore)} */}
                </p>
                <p className="view-more" onClick={handleGamegategorySelection}
                    style={{
                    paddingLeft:'20px'
                }}
                >view more...</p>
            </div>
            <div className="Longcard-scrolling-container">
                <Slider {...settings}>
                    {GameData.map((game, index) => (
                        <div key={index}>
                            <div className="Longcard-scrolling-img-body">

                                {renderContent(game, index)}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default LongCardScrolling;