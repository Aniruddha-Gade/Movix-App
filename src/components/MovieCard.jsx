import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Img from './Img';
import CircleRating from './CircleRating';
import Genres from './Genres';
import noPoster from './../assets/no-poster.png'
import dayjs from 'dayjs';


const MovieCard = ({ data, fromSearch, mediaType }) => {
  const { url } = useSelector(state => state.home)
  const navigate = useNavigate();
  const posterUrl = data?.poster_path ? url.poster + data?.poster_path : noPoster;


  return (
    <div
      onClick={() => navigate(`/details/${data.media_type || mediaType}/${data.id}`)}
      className='w-[calc(50%-5px)] mb-[25px] cursor-pointer shrink md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]'>

      {/* poster Block */}
      <div className='relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] transition-all duration-200 hover:opacity-50'>
        <Img
          src={posterUrl}
          alt={`poster Url of ${data?.title || data?.name} `}
          className={'absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden '}
        />

        {!fromSearch && (
          <React.Fragment>
            <CircleRating
              rating={data?.vote_average?.toFixed(1)}
              className={'w-[40px] h-[40px] relative top-[30px] bg-white shrink md:w-[50px] md:h-[50px] '}
            />
            <Genres
              data={data?.genre_ids?.slice(0, 2)}
              className={'relative flex flex-wrap justify-end  '} />
          </React.Fragment>
        )}
      </div>

      {/* text Block  */}
      <div className='text-white flex flex-col '>
        <span className='text-base md:text-xl mb-[10px]  '>
          {data?.title || data?.name}
        </span>
        <span className='text-sm opacity-50'>
          {dayjs(data?.release_date).format('MMM D, YYYY')}
        </span>
      </div>
    </div>
  )
}

export default MovieCard