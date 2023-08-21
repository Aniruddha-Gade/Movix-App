import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsComponents/DetailsBanner';
import Cast from './detailsComponents/Cast';
import OfficialVideoSection from './detailsComponents/OfficialVideoSection';
import Recommendation from './detailsComponents/Recommendation';
import SimilarMovies from './detailsComponents/SimilarMovies';

const Details = () => {

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
  const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`)


  console.log('Data from Details.jsx')
  console.log(`data of ${mediaType}/${id}/videos  -> `, data)
  console.log(`data of ${mediaType}/${id}/credits  -> `, credits)

  const location = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [location])



  return (
    <div className=''>
      {/* Director and writer data is stored in crew  */}
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

      <Cast data={credits?.cast} loading={creditsLoading} />

      <OfficialVideoSection data={data} loading={loading} />

      <Recommendation mediaType={mediaType} id={id} />

      <SimilarMovies mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details