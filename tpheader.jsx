import React, { useState, useEffect } from 'react'
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
  const [showNavBar, setShowNavBar] = useState('top');
  const [searchShow, setShowSearch] = useState('');

  const navigate = useNavigate();
  const location = useLocation();


  // effect Hooks
  useEffect(() => {
    scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);

    return () => {
      window.removeEventListener('scroll', controlNavbar);

    }
  })


  // control Navbar
  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScollY && !mobileMenu) setShowNavBar('hide')

      else setShowNavBar('show')
    }

    else setShowNavBar('top')

    setLastScrollY(window.scrollY);
  }

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setmobileMenu(false);
  }

  const openSearch = () => {
    setShowSearch(true);
    setmobileMenu(false);
  }

  const openMobileMenu = () => {
    setShowSearch(false);
    setmobileMenu(true);
  }


  const searchQueryHandler = (event) => {
    if ((event?.key === 'Enter' || event === 'searchButton') && searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`);

      setTimeout(() => {
        setShowSearch(false);
      }, 1000)
    }
  }





  return (
    // showNavBar - uses css from index.css to hide/show navbar as we scroll
    <header className={`${mobileMenu ? 'bg-black3' : ''} fixed flex items-center w-full h-[60px] z-[1] translate-y-0 transition-all ${showNavBar}`}>
      <div className='w-full flex items-center justify-between max-w-[1200px] mx-auto px-5'>
        <div className='cursor-pointer h-[50px] '>
          <img src={logo} alt='Movix Logo' onClick={() => navigate('/')} />
        </div>

        {/* list of menu items  */}
        <ul className={`${mobileMenu ? 'absolute top-[60px] left-0 bg-black3 flex flex-col w-full py-5 border-t border-[rgba(255, 255, 255, 0.1)] animation-mobileMenu text-white' : 'hidden md:flex text-white list-none items-center '}   
          `}>
          <li
            onClick={() => navigationHandler('Movie')}
            className={`
            h-[60px] mx-[15px] flex items-center relative font-bold hover:text-pink cursor-pointer duration-300 `}
          >Movies</li>

          <li
            onClick={() => navigationHandler("tv")}
            className={`${mobileMenu ? 'text-[20px] w-full h-auto py-[15px] px-5 m-0 items-start  ' :
              'h-[60px] mx-[15px] items-center relative '}
             flex font-bold hover:text-pink cursor-pointer duration-300 `}
          >TV Shows</li>

          <li
            onClick={openSearch}
            className={`h-[60px] mx-[15px] flex items-center relative font-bold hover:text-pink cursor-pointer duration-300 `}
          ><HiOutlineSearch size={'25px'} /></li>
        </ul>


        {/* for mobile phones  */}
        <div className='md:hidden flex text-white text-xl gap-6 bg-black3'>
          <HiOutlineSearch onClick={openSearch} />
          {
            mobileMenu ? <VscChromeClose onClick={() => setmobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />
          }
        </div>

      </div>


      {/* show search  */}
      {
        searchShow && (
          // search bar 
          <div>
            <ContentWrapper>
              {/* search input  */}
              <div className='flex items-center  '>
                <input
                  type="text"
                  placeholder='Search for movie or tv shows....'
                  className=' outline-none border-none '
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
                />

                <VscChromeClose onClick={() => setShowSearch(false)} />
              </div>
            </ContentWrapper>

          </div>
        )}

    </header>
  )
}

export default Header