import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import YouTube from 'react-youtube';
import HoverVideoPlayer from 'react-hover-video-player';
import "./CardScrolling.css";
import { useSelector , useDispatch } from 'react-redux';
import { fetchcategory } from "../middleware/category";


const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
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
                width="24" height="24" fill="white"
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
                backgroundColor: '#000000',
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
                fill="white"
            ><path d="m13.707 4.707-1.414-1.414L3.586 12l8.707 8.707 1.414-1.414L6.414 12l7.293-7.293z" /><path d="m19.707 4.707-1.414-1.414L9.586 12l8.707 8.707 1.414-1.414L12.414 12l7.293-7.293z" />
            </svg>
        </div>
    );
};


const CardScrolling = ({ GameData, GameDataName }) => {

    const dispatch = useDispatch();
    const [hoveredIndex, setHoverIndex] = useState(-1);
    const navigateToThisGame = useNavigate();

    const handleGameSelection = (game) => {
        const gameTitle = game.title.replace(/\s+/g, '-').toLowerCase(); // Convert title to URL-friendly format
        navigateToThisGame(`/game/${gameTitle}`, { state: { game , GameData } });
    };
   
    const handleGamegategorySelection = async() => {
    //       console.log(GameDataName);
    //     const data={
    //         category:GameDataName,
    //         limit:50,
    //         page:1,
    //         filter:'new'
    //     }
    //   await fetchcategory(data,dispatch);
      
         navigateToThisGame(`games/${GameDataName}`);
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

    const renderContent = (game, index) => {
        const videoId = extractVideoId(game.trailer);


        if (hoveredIndex === index) {
            const url = "https://drive.google.com/file/d/1AFx1hQszwDoEILMPl-o7M1hE8T0AUucl/preview"
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
                // <img
                //     className="card-img"
                //     src={game.image.game1}
                //     alt={game.name}
                //     onMouseEnter={() => handleMouseEnter(index)}
                //     onClick={() => handleGameSelection(game.name)}
                // />

                <video autoplay style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill',
                }}>
                    <source src="https://ia903202.us.archive.org/18/items/vid-20240413-wa-0040/VID-20240413-WA0040.mp4" type="video/mp4" />
                </video>

            );
        } else {
            return (
                <img
                    className="card-img"
                    // src={game.image.game1}
                    src="https://i.ibb.co/2cH7W8J/IMG-20240511-WA0009.jpg"
                    alt={game.name}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleGameSelection(game.name)}
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
        speed: 1800,
        slidesToShow: 6,
        slidesToScroll: 3,
        infinite: true,
        // autoplay: true,
        // arrows:onmouseenter ? true:false,
        autoplaySpeed: 100,
        nextArrow: <NextArrow className="nextArrow" />,

        prevArrow: <PrevArrow className="nextArrow" />,
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
                <p className="category-name" style={{
                    paddingLeft:'0px'
                }}>
                    {GameDataName}
                    {/* {console.log(GameStore)} */}
                </p>
                <p className="view-more" onClick={handleGamegategorySelection} 
                style={{
                    paddingLeft:'20px'
                }}>view more...</p>
            </div>
            <div className="card-scrolling-container">
                <Slider {...settings}>
                    {GameData.map((game, index) => (
                        <div key={index}>
                            <div className="card-scrolling-img-body hover:border-custom-purple" >

                                {/* {renderContent(game, index)} */}
                                <HoverVideoPlayer
                                
                                    videoSrc={game.video_url}
                                    
                                    pausedOverlay={
                                        <img
                                            src={game.image_url}
                                            alt="this is img"
                                            style={{
                                                // Make the image expand to cover the video's dimensions
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'fill',
                                                borderRadius:'10px',
                                            }}
                                        />
                                    }
                                    onClick={() => handleGameSelection(game)}

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