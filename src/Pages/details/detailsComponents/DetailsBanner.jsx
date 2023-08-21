import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

import useFetch from '../../../hooks/useFetch'
import Genres from './../../../components/Genres';
import CircleRating from './../../../components/CircleRating';
import Img from '../../../components/Img'
import noPoster from '../../../assets/no-poster.png'

import ContentWrapper from '../../../components/ContentWrapper'
import VideoPopup from './../../../components/VideoPopup';
import { PlayBtn } from './PlayBtn'



const DetailsBanner = ({ video, crew }) => {

    const [showVideo, setShowVideo] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { url } = useSelector((state => state.home))

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    // director and writer of the movie/tv
    const director = crew?.filter((f) => f.job === "Director");
    console.log('Director of this ->', data?.title, data?.created_by, mediaType, '- is', director);

    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer");
    console.log('Writer of this ->', data?.title, mediaType, '- is', writer);


    // will srore all genres id bcoz data has 'id' as well as 'name' but we created Genres component based on 'id' 
    const _genres = data?.genres?.map(g => g.id)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = Math.floor(totalMinutes % 60);
        return `${hours}h${minutes > 0 ? ` ${minutes}` : ''}`
    }



    return (
        <div className='text-white w-full bg-black pt-[100px] md:pt-[120px] mb-[50px] md:mb-0 md:min-h-[700px]  '>
            {
                !loading ? (
                    <>
                        {
                            !!data && (
                                <React.Fragment>
                                    {/* backdrop img */}
                                    <div className='w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden'>
                                        <Img src={url.backdrop + data?.backdrop_path} alt={'Backdrop Image'} />
                                    </div>
                                    {/* opacity layer  */}
                                    <div className='w-full h-[250px] absolute bottom-0 left-0 opacity-layer-bg-gradient'></div>

                                    <ContentWrapper>
                                        {/* content  */}
                                        <div className='relative flex flex-col md:flex-row gap-[25px] md:gap-[50px] '>
                                            {/* left div */}
                                            <div className='shrink-0'>
                                                {
                                                    data?.poster_path ?
                                                        <img
                                                            src={url?.backdrop + data?.poster_path}
                                                            className={`w-full block rounded-xl md:max-w-[350px] `}
                                                            alt={`${data?.name || data?.title}  ${mediaType} Image`}
                                                        />
                                                        : <img
                                                            src={noPoster}
                                                            className={`w-full block rounded-xl md:max-w-[350px]`}
                                                            alt={`No Poster Available`}
                                                        />
                                                }
                                            </div>

                                            {/* right div  */}
                                            <div className='text-white '>
                                                {/* title  */}
                                                <div className='text-[28px] leading-10 md:text-[34px] md:leading-[44px] '>
                                                    {
                                                        `${data?.name || data?.title}
                                                        (${dayjs(data?.release_date).format('YYYY')})`

                                                    }
                                                </div>
                                                {/* tagline  */}
                                                <div className='text-base md:text-xl mb-[15px] italic opacity-50  '>
                                                    {data?.tagline}
                                                </div>

                                                <Genres data={_genres} className={'mb-[25px] flex gap-[5px] flex-wrap '} />

                                                {/* row  */}
                                                <div className='flex items-center gap-[25px] mb-[25px]'>
                                                    <CircleRating
                                                        rating={data?.vote_average?.toFixed(1)}
                                                        className={'max-w-[70px] bg-black2 md:max-w-[90px] '}
                                                        fillColor={'#ffffff'}
                                                    />

                                                    {/*Video play btn */}
                                                    <div
                                                        onClick={() => { setShowVideo(true); setVideoId(video?.key); }}
                                                        className='playbtn '
                                                    >
                                                        <PlayBtn />

                                                        <span className='text'>
                                                            Watch Trailer
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* overview  */}
                                                <div className='mb-[25px]'>
                                                    {/* heeading  */}
                                                    <span className='text-2xl mb-[10px] '>Overview</span>
                                                    <p className='leading-6 md:pr-[100px] '>
                                                        {data?.overview}
                                                    </p>
                                                </div>

                                                {/* info */}
                                                <div className='border-b border-[#FFFFFF1A] flex py-[15px]'>
                                                    {
                                                        data?.status &&
                                                        (// infoItem
                                                            <div className='mr-[10px] flex flex-wrap '>
                                                                {/* text bold  */}
                                                                <span className='mr-[10px] leading-6 font-semibold '>
                                                                    Status:{' '}
                                                                </span> <span className='mr-[10px] leading-6 opacity-50'>
                                                                    {data.status}
                                                                </span>
                                                            </div>)
                                                    }

                                                    {
                                                        data?.release_date &&
                                                        (// infoItem
                                                            <div className='mr-[10px] flex flex-wrap'>
                                                                {/* text bold  */}
                                                                <span className='mr-[10px] leading-6 font-semibold'>
                                                                    Release Date:{' '}
                                                                </span>
                                                                <span className='mr-[10px] leading-6 opacity-50'>
                                                                    {dayjs(data.release_date).format('MMM D, YYYY')}
                                                                </span>
                                                            </div>)
                                                    }

                                                    {
                                                        data?.runtime &&
                                                        (// infoItem
                                                            <div className='mr-[10px] flex flex-wrap'>
                                                                {/* text bold  */}
                                                                <span className='mr-[10px] leading-6 font-semibold'>
                                                                    Runtime:{' '}
                                                                </span>
                                                                <span className='mr-[10px] leading-6 opacity-50'>
                                                                    {toHoursAndMinutes(data.runtime)}
                                                                </span>
                                                            </div>)
                                                    }
                                                </div>

                                                {/* Director  */}
                                                {
                                                    director?.length > 0 &&
                                                    (// info
                                                        <div className='flex flex-wrap border-b border-[#FFFFFF1A] py-[15px]'>
                                                            {/* text bold  */}
                                                            <span className='mr-[10px] leading-6 font-semibold'>
                                                                Director:{' '}
                                                            </span>
                                                            <span className='mr-[10px] leading-6 opacity-50'>
                                                                {
                                                                    director.map((w, ind) => (
                                                                        <span key={ind}>
                                                                            {w?.name}
                                                                            {director.length - 1 !== ind && ', '}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>)
                                                }


                                                {/* Writer  */}
                                                {
                                                    writer?.length > 0 &&
                                                    (// info
                                                        <div className='flex flex-wrap border-b border-[#FFFFFF1A] py-[15px]'>
                                                            {/* text bold  */}
                                                            <span className='mr-[10px] leading-6 font-semibold'>
                                                                Writer:{' '}
                                                            </span>
                                                            <span className='mr-[10px] leading-6 opacity-50'>
                                                                {
                                                                    writer.map((w, ind) => (
                                                                        <span key={ind}>
                                                                            {w?.name}
                                                                            {writer.length - 1 !== ind && ', '}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>)
                                                }

                                                {/* For Tv show - creator */}
                                                {/* Writer  */}
                                                {
                                                    data?.created_by?.length > 0 &&
                                                    (// info
                                                        <div className='flex flex-wrap border-b border-[#FFFFFF1A] py-[15px]'>
                                                            {/* text bold  */}
                                                            <span className='mr-[10px] leading-6 font-semibold'>
                                                                Creator:{' '}
                                                            </span>
                                                            <span className='mr-[10px] leading-6 opacity-50'>
                                                                {
                                                                    data?.created_by?.map((w, ind) => (
                                                                        <span key={ind}>
                                                                            {w?.name}
                                                                            {data?.created_by?.length - 1 !== ind && ', '}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </span>
                                                        </div>)
                                                }

                                            </div>

                                        </div>

                                        {/* video popup  */}
                                        <VideoPopup
                                            showVideo={showVideo} setShowVideo={setShowVideo}
                                            videoId={videoId} setVideoId={setVideoId}
                                        />

                                    </ContentWrapper>
                                </React.Fragment>
                            )
                        }

                    </>
                )
                    :
                    // if Data is not load 
                    (
                        <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                            <ContentWrapper className={'flex gap-[50px]'}>
                                <div className="skeleton shrink-0 w-full block rounded-xl aspect-[1/1.5] md:max-w-[350px] "></div>
                                <div className="w-full">
                                    <div className="skeleton w-full h-[25px] mb-[20px] rounded-[50px] "></div>
                                    <div className="skeleton w-[75%] h-[25px] mb-[50px] rounded-[50px] "></div>
                                    <div className="skeleton w-full h-[25px] mb-[20px] rounded-[50px] "></div>
                                    <div className="skeleton w-full h-[25px] mb-[20px] rounded-[50px] "></div>
                                    <div className="skeleton w-[50%] h-[50px] mb-[20px] rounded-[50px] "></div>
                                    <div className="skeleton w-full h-[25px] mb-[20px] rounded-[50px] "></div>
                                    <div className="skeleton w-full h-[25px] mb-[20px] rounded-[50px] "></div>
                                </div>
                            </ContentWrapper>
                        </div>
                    )
            }
        </div>
    )
}

export default DetailsBanner