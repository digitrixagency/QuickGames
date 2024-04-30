import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardScrolling.css";

import AfroStyles from "./AfroStyles";

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
                                <img className="card-img" src={game.image.game1} alt={game.name} />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default CardScrolling;