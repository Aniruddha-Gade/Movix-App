import React from 'react'

import HeroBanner from './homeComponents/HeroBanner';
import Trending from './homeComponents/Trending';
import Popular from './homeComponents/Popular';
import TopRated from './homeComponents/TopRated';
import Upcoming from './homeComponents/Upcoming';

const Home = () => {
  return (
    <div className='text-white '>

      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      <Upcoming />

    </div>
  )
}

export default Home