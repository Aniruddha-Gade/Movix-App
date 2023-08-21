import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/ContentWrapper';
import Img from '../../../components/Img';


const HeroBanner = () => {

  const [background, setBackground] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const searchQueryHandler = (event) => {
    if ((event?.key === 'Enter' || event === 'searchButton') && searchQuery?.length > 0) {
      navigate(`/search/${searchQuery}`);

    }
  }

  // using custom hook 
  const { data, loading } = useFetch('/movie/upcoming');
  const { url } = useSelector(state => state.home);

  useEffect(() => {
    // console.log('url.backdrop = ', url.backdrop)
    // url.backdrop - check in App.jsx 
    const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    console.log('random bg is - ', bg)

    setBackground(bg);
  }, [data])




  return (

    // hero Banner 
    <div className='w-full h-[450px] md:h-[700px] flex items-center relative bg-black  '>
      {
        !loading &&
        <div className='w-full h-full absolute top-0 left-0 opacity-[0.5] overflow-hidden object-cover'>
          <Img src={background} />
        </div>
      }

      {/* opacity layer  */}
      <div className='absolute left-0 bottom-0 w-full h-[250px] opacity_layer_bg '></div>

      {/* wrapper */}
      <ContentWrapper>
        {/* content */}
        <div className='flex flex-col items-center text-white text-center max-w-[800px] relative mx-auto '>
          <span className="font-black text-[50px] mb-[10px] md:mb-0 md:text-[90px] ">Welcome</span>
          <span className="text-[18px] md:text-[24px] font-medium mb-[40px] ">
            Millons of movies , TV shows and people to discover.
            Explore Now.
          </span>

          {/* search Input */}
          <div className='flex items-center w-full '>
            <input
              type="text"
              placeholder='Search for movie or tv shows....'
              className='w-[calc(100%-100px)] md:w-[calc(100%-150px)] h-[50px] md:h-[60px] text-black bg-white px-[15px] md:px-[30px] 
                       rounded-l-[30px] text-[14px] md:text-[20px] outline-none border-none font-medium'
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              ref={searchRef}
            />

            <button
              onClick={() => {
                searchQueryHandler('searchButton');
                searchRef.current?.focus();
              }}
              className="w-[100px] md:w-[150px] h-[50px] md:h-[60px] text-white rounded-r-[30px] text-[16px] md:text-[18px] outline-none border-none search_btn_gradient"
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner