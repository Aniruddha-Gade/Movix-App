import React, { useState } from 'react'
import ContentWrapper from './../../../components/ContentWrapper';
import SwitchTabs from '../../../components/SwitchTabs'
import Carousel from '../../../components/Carousel'

import useFetch from '../../../hooks/useFetch'




const Trending = () => {
    const [endpoint, setEndpoint] = useState('day')

    const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab.toLowerCase());
    }

    return (
        // carousel section 
        <div className='relative mb-[70px] '>
            <ContentWrapper className='flex items-center justify-between mb-5 '>
                <span className='text-2xl text-normal '>Trending</span>

                <SwitchTabs data={['Day', 'Week']} onTabChange={onTabChange} />
            </ContentWrapper >

            <Carousel data={data?.results} loading={loading} />

        </div>
    )
}

export default Trending