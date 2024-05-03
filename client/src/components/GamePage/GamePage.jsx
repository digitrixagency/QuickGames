import React, { useRef } from "react";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./GamePage.css";
import UserRecentPlayed from "../RelatedGames/RelatedGame";




const GamePage = ({GameData}) => {

    const iframeRef = useRef(null);

    const toggleFullScreen = () => {
        const iFrame = iframeRef.current;

        if (!iFrame) return;

        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            iFrame.requestFullscreen().catch(err => {
                console.log(`Error full-screen mode : ${err.message}`)
            });
        }
    };
    return (
        <>
            <div className="Gamepage-cointainer">
                <div className="main-game-page">
                    <div className="game-box">
                        <iframe
                            ref={iframeRef}
                            className="game"
                            src="https://cdn.htmlgames.com/HalloweenCardConnect/"
                        ></iframe>
                    </div>
                    <div className="screen-mode-div">
                        <ThumbUpOffAltIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            color='primary'

                        />
                        <ThumbDownOffAltIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            color='primary'

                        />
                        <FavoriteIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            color='primary'
                        />

                        <FullscreenIcon
                            style={{ cursor: 'pointer', marginRight: '10px' }}
                            color='primary'
                            fontSize='large'
                            onClick={toggleFullScreen}
                        />
                    </div>
                    <div className="game-descriptions">
                        <h1>Game Title</h1>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Rating:</text>
                            <text>8.6(14,431 votes)</text>
                        </div>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Developer:</text>
                            <text>No Data</text>
                        </div>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Released:</text>
                            <text>July 2023</text>
                        </div>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Technology:</text>
                            <text>HTML5 (Unity WebGL)</text>
                        </div>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Platforms:</text>
                            <text>Browser (desktop, mobile, tablet), App Store(iOS, Android)</text>
                        </div>
                        <div className="decription-table">
                            <text style={{ width: '20%', color: '#929aab', fontSize: '16px' }}>Classification:</text>
                            <text>Games»Casual»Driving»Car</text>
                        </div>

                        <hr style={{ margin: '10px 0px' }} />

                        <div className="description-para">
                            Jump Into The Plane is a casual game that lets you perform mind-blowing stunts as you jump from a car into a plane, channeling your inner super agent. Who needs conventional parking when you can drive straight into a cargo hold? Brace yourself for an insanely fun experience that defies logic. With a wide array of cars, planes, and thrilling locations, prepare for heart-pounding excitement. But remember, timing is everything. Don't miss your chance to catch that plane!
                        </div>


                        <h3 style={{
                            marginBlock: '16.38px',
                            fontFamily: 'Nunito, Arial, Helvetica, sans-serif',
                            fontWeight: 900,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            Release Date
                        </h3>
                        <ul style={{ boxSizing: 'border-box', listStyleType: 'circle', paddingLeft: '20px' }}>
                            <li style={{ boxSizing: 'border-box' }}>September 2021 (Android and iOS)</li>
                            <li style={{ boxSizing: 'border-box' }}>July 2023 (WebGL)</li>
                        </ul>
                        <h3 style={{
                            marginBlock: '16.38px',
                            fontFamily: 'Nunito, Arial, Helvetica, sans-serif',
                            fontWeight: 900,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            Developer
                        </h3>
                        <p style={{
                            marginBlockEnd: 0,
                            marginBlockStart: 0,
                            boxSizing: 'border-box',
                        }}>
                            Boombit developed Jump Into The Plane.
                        </p>
                        <h3 style={{
                            marginBlock: '16.38px',
                            fontFamily: 'Nunito, Arial, Helvetica, sans-serif',
                            fontWeight: 900,
                            color: 'rgb(255, 255, 255)',
                        }}>
                            Platforms
                        </h3>
                        <ul style={{ boxSizing: 'border-box', listStyleType: 'circle', paddingLeft: '20px' }}>
                            <li style={{ boxSizing: 'border-box' }}>Web browser (desktop and mobile)</li>
                            <li style={{ boxSizing: 'border-box' }}>Android</li>
                        </ul>
                    </div>
                </div>
                <div className="related-game-page">
                    <UserRecentPlayed game={GameData}/>
                </div>
            </div>
            <div className="related-game-pagelower"
                style={{paddingLeft:'5%'}}
            >
                <UserRecentPlayed game={GameData}/>
            </div>
        </>
    );
}

export default GamePage;