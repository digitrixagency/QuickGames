import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from 'react-youtube';
import "./CardScrolling.css";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="black"
                height="24"
                viewBox="0 0 512 512"
                width="24"
            >
                <path d="M272 464.4L456.4 280 272 95.6 272 192 144 192 144 320 272 320z" />
            </svg>
        </div>
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="black"
                height="24"
                viewBox="0 0 512 512"
                width="24"
            >
                <path d="M240 464.4L55.6 280 240 95.6 240 192 368 192 368 320 240 320z" />
            </svg>
        </div>
    );
};


const CardScrolling = ({ GameData, GameDataName }) => {
    const [hoveredIndex, setHoverIndex] = useState(-1);
    const navigateToThisGame = useNavigate();

    const handleGameSelection = (gameName) => {
        navigateToThisGame(`this-game-name/`);
    };

    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    }

    const handleMouseLeave = () => {
        setHoverIndex(-1);
    }

    // const renderContent = (game, index) =>{
    //     if(hoveredIndex === index){
    //         const videoId = extractVideoId("https://www.youtube.com/watch?v=bXrDhn7ERmg");
    //         const opts = {
    //             height: '200',
    //             width: '150',
    //             playerVars: {
    //                 autoplay: 1,             // Auto-play the video
    //                 loop: 1,                 // Loop the video
    //                 controls: 0,             // Hide player controls
    //                 modestbranding: 1,       // Reduce YouTube branding
    //                 showinfo: 0,             // Hide video title and uploader info
    //                 fs: 0,                   // Disable full-screen option
    //                 rel: 0,                 // Disable related videos at the end
    //                 mute:1,
    //                 disablekb: 1,          // Disable keyboard controls (0 or 1)               

    //             }
    //         };
    //         return(
    //             <YouTube
    //                 videoId={videoId} // Assuming game object contains a trailer property with YouTube video ID
    //                 opts={opts} // Adjust player options as needed
    //                 onEnd={() => setHoverIndex(-1)}
    //                 onError={(e) => console.log('Error:', e)}
    //             />
    //         );
    //     } else {
    //         return (
    //             <img 
    //                 className="card-img" 
    //                 src={game.image.game1} 
    //                 alt={game.name} 
    //                 onMouseEnter={() => handleMouseEnter(index)}
    //                 onMouseLeave={handleMouseLeave}
    //             />
    //         );
    //     }
    // }

    // const extractVideoId = (videoUrl) => {
    //     // Example video URL: https://www.youtube.com/watch?v=VIDEO_ID
    //     const videoId = videoUrl.split('v=')[1];
    //     console.log(videoId)
    //     return videoId;
    // };

    const renderContent = (game, index) => {
        const videoId = extractVideoId(game.trailer);
        

        if (hoveredIndex === 2) {
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0`;
            return (
                <div className="video-container" onMouseLeave={handleMouseLeave}>
                    <iframe
                        title={game.name}
                        src={embedUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="video-iframe"
                    ></iframe>
                </div>
            );
        } else {
            return (
                <img
                    className="card-img"
                    src={game.image.game1}
                    alt={game.name}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={()=> handleGameSelection(game.name)}
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
        speed: 1500,
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 1000,
        // nextArrow:<NextArrow/>,

        //   prevArrow: <PrevArrow/>,
        responsive: [
            {
                breakpoint: 1110,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 872,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
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
                <p className="view-more">view more...</p>
            </div>
            <div className="card-scrolling-container">
                <Slider {...settings}>
                    {GameData.map((game, index) => (
                        <div key={index}>
                            <div className="card-scrolling-img-body">
                                {/* <img className="card-img" src={game.image.game1} alt={game.name} /> */}
                                {renderContent(game, index)}
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CardScrolling;