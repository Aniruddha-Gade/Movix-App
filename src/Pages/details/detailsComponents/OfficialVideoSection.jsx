import React, { useState, useRef } from 'react'

import ContentWrapper from '../../../components/ContentWrapper'
import VideoPopup from '../../../components/VideoPopup'
// import Img from '../../../components/Img'
import { PlayBtn } from './PlayBtn'

import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";


const OfficialVideoSection = ({ data, loading }) => {

    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const officialVideoContainerRef = useRef();

    const navigation = (dir) => {
        const container = officialVideoContainerRef.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };


    const loadingSkeleton = () => {
        return (
            <div className="w-[150px] shrink-0 md:w-1/4 ">
                <div className="skeleton w-full aspect-video rounded-xl mb-[10px] "></div>
                <div className="skeleton h-5 w-full rounded-[10px] mb-[10px] "></div>
                <div className="skeleton h-5 w-3/4 rounded-[10px] "></div>
            </div>
        );
    }

    return (
        <div className=' my-[50px] text-white'>
            <ContentWrapper className={`relative`}>
                <>
                    {
                        data?.results?.length > 0 &&
                        <>
                            <div className='text-2xl mb-[25px]'>Official Videos</div>

                            <BsFillArrowLeftCircleFill
                                className="hidden xl:block absolute top-[56%] left-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2 "
                                onClick={() => navigation("left")}
                            />
                            <BsFillArrowRightCircleFill
                                className="hidden xl:block absolute top-[56%] right-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2  "
                                onClick={() => navigation("right")}
                            />
                        </>
                    }
                </>


                {
                    !loading ? (
                        // videos 
                        <div className='flex gap-[10px] md:gap-5 overflow-x-auto -mr-5 -ml-5 px-5 md:m-0 md:p-0' ref={officialVideoContainerRef}>
                            {
                                data?.results?.map((video) => (
                                    <div
                                        key={video?.id}
                                        onClick={() => {
                                            setShowVideo(true);
                                            setVideoId(video.key)
                                        }}
                                        className='w-[150px] shrink-0 md:w-[25%] cursor-pointer'
                                    >
                                        {/* video Thumbnail */}
                                        <div className='relative mb-[15px] videoThumbnail '>
                                            <img
                                                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                className={`w-full relative block rounded-xl transition-all `}
                                            />

                                            {/*Video play btn */}
                                            <PlayBtn />
                                        </div>

                                        {/* video Title  */}
                                        <div className='text-white text-sm md:text-base truncate'>{video.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    )

                        : (// if data is not loaded
                            <div className="flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-5 md:gap-5 md:m-0 md:p-0 ">
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                                {loadingSkeleton()}
                            </div>
                        )

                }
            </ContentWrapper>

            <VideoPopup
                showVideo={showVideo}
                setShowVideo={setShowVideo}
                videoId={videoId}
                setVideoId={setVideoId}
            />

        </div>
    )
}

export default OfficialVideoSection