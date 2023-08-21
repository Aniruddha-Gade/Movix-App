// import React from 'react'
// import ReactPlayer from 'react-player'

// const VideoPopup = ({ showVideo, setShowVideo, videoId, setVideoId }) => {

//     const hidePopup = () => {
//         setShowVideo(false);
//         setVideoId(null);
//     }

//     return (
//         <div className={`invisible flex justify-center items-center w-full h-full fixed opacity-0 top-0 left-0 z-[9]  ${showVideo ? 'visible opacity-100 ' : ''} `}>
//             {/* opacity layer */}
//             <div
//                 onClick={hidePopup}
//                 className={`absolute top-0 left-0 w-full h-full backdrop-blur-[3.5px] opacity-0 transition-all duration-[400] ${showVideo ? 'opacity-100' : ''} `}
//             ></div>

//             <div className={`relative w-[800px] aspect-video bg-white scale-[0.2] transition-transform duration-[250] ${showVideo ? 'scale-150' : ''}`} >
//                 <span onClick={hidePopup}
//                     className='absolute -top-5 ring-0 text-white cursor-pointer '>
//                     close
//                 </span>

//                 <ReactPlayer
//                     url={`https://www.youtube.com/watch?v=${videoId}`}
//                     controls
//                     width="100%"
//                     height="100%"
//                     playing={true}
//                 />
//             </div>

//         </div>
//     )
// }

// export default VideoPopup;


import React from "react";
import ReactPlayer from "react-player/youtube";



const VideoPopup = ({ showVideo, setShowVideo, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShowVideo(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup ${showVideo ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer ">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;