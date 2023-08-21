import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import Img from '../../../components/Img'
import noAvatar from './../../../assets/avatar.png'
import ContentWrapper from '../../../components/ContentWrapper'

const Cast = ({ data, loading }) => {

    const { mediaType, id } = useParams();
    // console.log('Data from cast component --> mediaType - ', mediaType, ' id - ', id)

    const navigate = useNavigate();
    const { url } = useSelector(state => state.home)

    const castContainerRef = useRef();

    const navigation = (dir) => {
        const container = castContainerRef.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skeleton = () => {
        return (
            <div className=''>
                <div className='skeleton w-[125px] md:w-[175px] md:h-[175px] h-[125px] rounded-full mb-[15px] md:mb-[25px]'></div>
                <div className='skeleton w-full h-5 rounded-[10px] mb-[10px]'></div>
                <div className='skeleton w-[75%] h-5 rounded-[10px] mx-auto'></div>
            </div>
        )
    }


    return (
        <div className='text-white my-[50px]'>
            <ContentWrapper className={`relative`}>
                {/* section Heading */}
                <>
                    {
                        data?.length > 0 && <>
                            <h3 className='text-2xl text-white mb-[25px]'>Top Cast</h3>

                            <BsFillArrowLeftCircleFill
                                className="hidden xl:block absolute top-[45%] left-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2 "
                                onClick={() => navigation("left")}
                            />
                            <BsFillArrowRightCircleFill
                                className="hidden xl:block absolute top-[45%] right-[-2%] text-[30px] cursor-pointer opacity-50 z-[1] hover:opacity-80 -translate-y-1/2  "
                                onClick={() => navigation("right")}
                            />
                        </>
                    }
                </>



                {
                    !loading ? (
                        // list items 
                        <div className='flex gap-5 overflow-y-hidden -mr-5 -ml-5 px-5 md:m-0 md:p-0 ' ref={castContainerRef}>
                            {
                                data?.map((item) => {
                                    const imgUrl = item?.profile_path ? url?.profile + item?.profile_path : noAvatar;

                                    return (
                                        <div
                                            key={item?.id}
                                            className='text-center text-white cursor-pointer '
                                            onClick={() => navigate(`/details/${mediaType}/${id}/credit/${item.credit_id}`)}
                                        >
                                            {/* profile img */}
                                            <div className='relative w-[125px] md:w-[175px] h-[125px] md:h-[175px] rounded-full overflow-hidden mb-[15px] md:mb-[25px]'>
                                                <Img src={imgUrl} alt={`profile image of ${item?.name}`} className={`block object-center object-cover`} />
                                            </div>

                                            <div className='text-sm md:text-lg font-semibold'>{item?.name}</div>
                                            <div className='text-sm md:text-lg opacity-50'>{item?.character}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )

                        :

                        // if data is not load 
                        // cast skeleton
                        <div className='flex gap-5 overflow-y-hidden -mr-5 -ml-5 px-5 md:m-0 md:p-0 '>
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                }
            </ContentWrapper>
        </div>
    )
}

export default Cast