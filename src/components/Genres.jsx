import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({ data, className }) => {

    const { genres } = useSelector((state => state.home))


    return (
        <div className={`${className} `}>
            {
                data?.map(id => {
                    if (!genres[id]?.name) return;

                    return (
                        <div
                            key={id}
                            className='relative flex flex-wrap justify-end bg-pink py-[3px] px-[5px] text-xs rounded text-white whitespace-nowrap'
                        >
                            {genres[id]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres