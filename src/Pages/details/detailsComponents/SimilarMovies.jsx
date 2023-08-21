import React from 'react'

import Carousel from '../../../components/Carousel'
import useFetch from '../../../hooks/useFetch'

const SimilarMovies = ({ mediaType, id }) => {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`)

  const title = mediaType === 'tv' ? 'Similar Tv Shows' : 'Similar Movies'


  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  )
}

export default SimilarMovies