import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc'

import ContentWrapper from './ContentWrapper';
import logo from '../assets/movix-logo.svg'

const Header = () => {

  const [mobileMenu, setmobileMenu] = useState(false)
  const [lastScollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchShow, setShowSearch] = useState('');
  const [showNavBar, setShowNavBar] = useState('top');


  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef(null);

  // effect Hooks
  // In current page, if user scroll down and down and then user go to another page then scroll will show last position 
  // to handle this 
  useEffect(() => {
    scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);

    }
  })

  // as user click on search icon then search-input field will focus 
  useEffect(() => {
    if (inputRef.current)
      inputRef.current.focus();

  }, [searchShow]);


  // control Navbar
  const controlNavbar = () => {

    if (window.scrollY > 200) {
      if (window.scrollY > lastScollY && !mobileMenu) {
        setShowNavBar('hide')
        setShowSearch(false); // if user click on search icon and scrolling without close it , then we will close it 
      }
      else setShowNavBar('show')
    }

    else setShowNavBar('top')

    setLastScrollY(window.scrollY);
  }

  const navigationHandler = (mediaType) => {
    navigate(`/explore/${mediaType}`);
    setmobileMenu(false);
  }

  const openSearch = () => {
    setShowSearch(true);
    setmobileMenu(false);
    inputRef.current?.focus();
  }

  const openMobileMenu = () => {
    setShowSearch(false);
    setmobileMenu(true);
  }


  const searchQueryHandler = (event) => {
    if ((event?.key === 'Enter' || event === 'searchButton') && searchQuery?.length > 0) {
      navigate(`/search/${searchQuery}`);

      setTimeout(() => {
        setShowSearch(false);
      }, 0)
    }
  }





  return (
    // showNavBar - uses css from index.css to hide/show navbar as we scroll
    <header className={`${mobileMenu ? 'bg-black3' : ''} fixed flex items-center w-full h-[60px] z-[10] translate-y-0 transition-all ${showNavBar}`}>
      <div className='w-full flex items-center justify-between max-w-[1200px] mx-auto px-5'>
        <div className='cursor-pointer h-[50px] '>
          <img src={logo} alt='Movix Logo' onClick={() => navigate('/')} />
        </div>

        {/* list of menu items  */}
        <ul onBlur={() => setmobileMenu(false)}
          className={`${mobileMenu ? 'absolute top-[60px] left-0 bg-black3 flex flex-col w-full py-5 border-t animation-mobileMenu text-white'
            : 'hidden md:flex text-white list-none items-center '} `}
        >
          <li
            onClick={() => navigationHandler('movie')}
            className={`${mobileMenu ? 'text-[20px] w-full h-auto py-[15px] px-5 m-0 items-start  ' :
              'h-[60px] mx-[15px] items-center relative '}
             flex font-bold hover:text-pink cursor-pointer duration-300 `}
          >
            Movies</li>

          <li
            onClick={() => navigationHandler("tv")}
            className={`${mobileMenu ? 'text-[20px] w-full h-auto py-[15px] px-5 m-0 items-start  ' :
              'h-[60px] mx-[15px] items-center relative '}
             flex font-bold hover:text-pink cursor-pointer duration-300 `}
          >
            TV Shows</li>

          <li
            onClick={openSearch}
            className='hidden md:flex h-[60px] mx-[15px] items-center relative font-bold hover:text-pink cursor-pointer duration-300 '
          >
            <HiOutlineSearch size={'25px'} /></li>
        </ul>


        {/* for mobile phones  */}
        <div className='md:hidden flex text-white text-xl gap-6 h-[60px]'>
          <HiOutlineSearch onClick={openSearch} className='cursor-pointer hover:text-pink h-[60px]' />
          {
            mobileMenu ? <VscChromeClose onClick={() => setmobileMenu(false)} className='cursor-pointer hover:text-pink h-[60px]' />
              : <SlMenu onClick={openMobileMenu} className='cursor-pointer hover:text-pink h-[60px]' />
          }
        </div>

      </div>


      {/*floating show search bar  */}
      {
        searchShow && (
          // search bar 
          <div
            onBlur={() => setShowSearch(false)}
            className='w-full absolute top-[60px] h-[60px] bg-white animation-searchBar'
          >
            <ContentWrapper>
              {/* search input  */}
              <div className='flex items-center h-[40px] mt-[10px] w-full '>
                <input
                  type="text"
                  placeholder='Search for movie or TV shows....'
                  className='w-full h-[50px] md:h-[60px] px-[15px] md:px-[30px] text-[14px] md:text-[20px]
                  outline-none border-none rounded-l-[30px]'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                  ref={inputRef}
                />

                <VscChromeClose
                  onClick={() => setShowSearch(false)}
                  className='text-[20px] shrink-0 ml-[10px] cursor-pointer hover:text-pink h-[60px]' />
              </div>
            </ContentWrapper>

          </div>
        )}

    </header>
  )
}

export default Header