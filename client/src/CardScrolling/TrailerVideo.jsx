import React from 'react';
import YouTube from 'react-youtube';

const TrailerVideo = ({ videoId }) => {
    const opts = {
        height: '360',
        width: '640',
        playerVars: {
            autoplay: 1, // Autoplay the video
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default TrailerVideo;
