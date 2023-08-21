import React, { useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CircleRating from './CircleRating';
import dayjs from "dayjs";

import Genres from "./Genres";
import ContentWrapper from "./ContentWrapper";
import Img from "./Img";
import noPoster from '../assets/no-poster.png'

// Loading Skeleton
const sklItem = () => {
    return (
        // skeletonItem
        <div className="w-[125px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0">
            {/* posterBlock  */}
            <div className="skeleton w-full rounded-xl mb-[30px] aspect-[1/1.5] "></div>
            {/* textBlock */}
            <div className="flex flex-col">
                {/* title  */}
                <div className="skeleton rounded-xl w-full h-5 mb-[10px]  "></div>
                {/* "date  */}
                <div className="skeleton rounded-xl w-3/4 h-5"></div>
            </div>
        </div>
    )
}

const Carousel = ({ data, loading, endpoint, title }) => {

    const carouselContainerRef = useRef();
    const { url } = useSelector((state) => state.home)
    const navigate = useNavigate();



    const navigation = (dir) => {
        const container = carouselContainerRef.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };


    return (
        // carousel 
        <div className="mb-[50px] text-white">
            <ContentWrapper className={`relative`}>
                {/* carouselTitle */}
                <>
                    {
                        data?.length > 0 &&
                        <>
                            {title && <div className="text-2xl  mb-5 font-normal ">{title}</div>}

                            <BsFillArrowLeftCircleFill
                                className="hidden xl:block absolute top-[44%] left-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2 "
                                onClick={() => navigation("left")}
                            />
                            <BsFillArrowRightCircleFill
                                className="hidden xl:block absolute top-[44%] right-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2  "
                                onClick={() => navigation("right")}
                            />
                        </>

                    }
                </>



                {
                    !loading ? (
                        // carousel items 
                        <div className="flex gap-3 md:gap-5 -mr-5 -ml-5 px-5 md:m-0 md:p-0 overflow-y-hidden xl:overflow-hidden rounded-2xl "
                            ref={carouselContainerRef}
                        >
                            {
                                data?.map((item) => {
                                    const imageUrl = item?.poster_path ? (url?.backdrop + item?.poster_path) : noPoster;
                                    // console.log('postUrl inside carousel -> ', postUrl)

                                    return (
                                        // carousel item 
                                        <div
                                            key={item?.id}
                                            onClick={() => navigate(`/details/${item?.media_type || endpoint}/${item?.id}`)}
                                            className="w-[125px] cursor-pointer md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] shrink-0"
                                        >
                                            {/* posterBlock */}
                                            <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] ">
                                                <Img
                                                    src={imageUrl} alt='Poster of Movie'
                                                    className={`w-full h-full object-cover object-center`}
                                                />

                                                <CircleRating
                                                    rating={item?.vote_average.toFixed(1)}
                                                    className={'relative w-10 h-10 top-[30px] md:w-[50px] md:h-[50px] bg-white shrink-0'}
                                                    fillColor={'#04152d'}
                                                />

                                                <Genres data={item?.genre_ids.slice(0, 2)} className={'relative flex gap-[5px] flex-wrap justify-end'} />
                                            </div>

                                            {/* text block */}
                                            <div className="flex flex-col text-white">
                                                <span className="text-xs md:text-xl mb-[10px] leading-6 truncate">
                                                    {/* In certain data of movie - name of movie is stored as title and in Tv shows - name */}
                                                    {item?.title || item?.name}
                                                </span>
                                                {/* date */}
                                                <span className="text-[14px] opacity-50 ">
                                                    {dayjs(item.release_date).format('MMM D, YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>)

                        // if data is not load 
                        : (
                            // loading Skeleton
                            <div className="flex gap-3 md:gap-5 -mr-5 -ml-5 px-5 md:m-0 md:p-0 overflow-y-hidden md:overflow-hidden">
                                {sklItem()}
                                {sklItem()}
                                {sklItem()}
                                {sklItem()}
                                {sklItem()}
                                {sklItem()}
                            </div>
                        )
                }
            </ContentWrapper>

        </div>
    )
}

export default Carousel