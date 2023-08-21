import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ContentWrapper from '../../components/ContentWrapper';
import { useSelector } from 'react-redux';


import Img from './../../components/Img'
import noAvatar from './../../assets/avatar.png'
import { TbArrowBackUp } from 'react-icons/tb'


const CreditDetails = () => {

    const navigate = useNavigate();

    const { creditId } = useParams();
    const { data: creditdata, loading } = useFetch(`/credit/${creditId}`);

    // console.log("credit Data == ", creditdata)
    const { url } = useSelector(state => state.home)
    const imgUrl = creditdata?.person?.profile_path ? url?.profile + creditdata?.person?.profile_path : noAvatar;

    const Skeleton = () => {
        return (
            <div className='mb-10'>
                <div className='skeleton w-[125px] md:w-72 sm:w-60 h-[125px] md:h-72 sm:h-60 rounded-full mb-[15px] md:mb-[25px]'></div>
                <div className='skeleton w-full h-5 rounded-[10px] mb-[10px]'></div>
                <div className='skeleton w-[75%] h-5 rounded-[10px] mx-auto'></div>
            </div>
        )
    }


    return (
        <div className='text-white mt-[100px] '>
            <ContentWrapper className={'relative flex justify-center items-center '}>
                {
                    !loading ? (
                        <div className='flex flex-col justify-center items-center '>

                            {/* back button */}
                            <div onClick={() => navigate(-1)}>
                                <TbArrowBackUp className='absolute left-7 -top-5 h-9 w-9 md:top-2 md:h-12 md:w-14 cursor-pointer hover:text-pink duration-200' />
                            </div>

                            {/* profile img */}
                            <div className='relative w-[125px] sm:w-60 md:w-72 h-[125px] md:h-72 sm:h-60 rounded-full overflow-hidden mb-[15px] md:mb-[25px] 
                                shadow-[0px_2px_40px_0px_#f7fafc] '>
                                <Img src={imgUrl} alt={`profile image of ${creditdata?.name}`} className={`block object-center object-cover `} />
                            </div>



                            {/* Name - character of person */}
                            <div>
                                <h3 className='text-3xl font-bold text-center '>{creditdata?.person?.name}🎬</h3>
                                <h3 className='text-base text-neutral-500 font-bold text-center '>{creditdata?.media?.character}</h3>
                            </div>

                            {/* gender - character - known for - Gender -Popularity */}
                            <div className='mx-3 text-[12px] sm:text-[15px] md:text-[17px] p-2 md:p-4 mt-6 flex justify-between items-center bg-[#112241] rounded-full '>
                                <div className='border-r-2 border-neutral-400 px-1 sm:px-3 md:px-4 flex flex-col items-center'>
                                    <p className='font-semibold '>character</p>
                                    <p className='text-neutral-300 text-sm truncate'>{creditdata?.media?.character}</p>
                                </div>

                                <div className='border-r-2 border-neutral-400 px-1 sm:px-3 md:px-4 flex flex-col items-center'>
                                    <p className='font-semibold '>known for</p>
                                    <p className='text-neutral-300 text-sm'>{creditdata?.department}</p>
                                </div>

                                <div className='border-r-2 border-neutral-400 px-1 sm:px-3 md:px-4 flex flex-col items-center'>
                                    <p className='font-semibold '>Gender</p>
                                    <p className='text-neutral-300 text-sm'>{creditdata?.person?.gender === 1 ? 'Female' : 'Male'}</p>
                                </div>

                                <div className='p-1 md:px-4 flex flex-col items-center'>
                                    <p className='font-semibold '>Popularity</p>
                                    <p className='text-neutral-300 text-sm'>{creditdata?.person?.popularity}</p>
                                </div>
                            </div>


                            {/* Biography */}
                            <div className='my-6 mx-4 space-y-2 text-center'>
                                <p className='text-lg'>⭐ Biography ⭐</p>
                                <p className='text-neutral-400 tracking-wide text-center'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est quas eligendi enim! Dignissimos dolorum unde recusandae
                                    accusantium numquam amet iure reprehenderit nesciunt mollitia quo, architecto porro, praesentium a laborum exercitationem
                                    velit, aut veritatis eligendi provident. Molestiae id facere voluptas architecto fugit pariatur sequi molestias iste nisi
                                    omnis vitae, dolor dolorum? Dolorum numquam sapiente veritatis perspiciatis necessitatibus nam voluptates voluptatibus
                                    nemo dignissimos. Est accusantium et illo molestias nulla veniam vel praesentium in, exercitationem aperiam magni esse
                                    assumenda asperiores totam provident ducimus laborum quaerat. Magni accusamus animi pariatur quisquam ducimus dolores
                                    quo maxime fugiat id porro sequi temporibus illum, praesentium assumenda quibusdam!
                                </p>
                            </div>


                        </div>
                    )

                        :

                        (
                            // if data is not load 
                            // cast skeleton
                            <div className='flex items-center justify-center w-full gap-5 overflow-y-hidden -mr-5 -ml-5 px-5 md:m-0 md:p-0 '>
                                {Skeleton()}

                            </div>
                        )
                }

            </ContentWrapper>
        </div>
    )
}

export default CreditDetails