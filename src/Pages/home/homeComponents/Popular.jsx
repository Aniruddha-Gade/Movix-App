import React, { useState } from 'react'
import ContentWrapper from './../../../components/ContentWrapper';
import SwitchTabs from '../../../components/SwitchTabs'
import Carousel from '../../../components/Carousel'

import useFetch from '../../../hooks/useFetch'




const Popular = () => {
    const [endpoint, setEndpoint] = useState('movie')

    const { data, loading } = useFetch(`/${endpoint}/popular`);

    const onTabChange = (tab) => { 
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv')
    }

    return (
        // carousel section 
        <div className='relative mb-[70px] '>
            <ContentWrapper className='flex items-center justify-between mb-5 '>
                <span className='text-2xl text-normal '>What's Popular</span>

                <SwitchTabs data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </ContentWrapper >

            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />

        </div>
    )
}

export default Popular