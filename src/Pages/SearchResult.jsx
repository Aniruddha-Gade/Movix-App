import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'

import { fetchDataFromApi } from './../utils/api';
import ContentWrapper from './../components/ContentWrapper';
import MovieCard from './../components/MovieCard';
import Spinner from './../components/Spinner';



const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { searchQuery } = useParams();


  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${searchQuery}&page=${pageNum}`)
      .then((res) => {
        setData(res);
        setPageNum(prev => prev + 1);
        setLoading(false);
      })
  }

  const fetchNextpageData = () => {
    fetchDataFromApi(`/search/multi?query=${searchQuery}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results]
          });
        }

        else {
          setData(res);
        }

        setPageNum(prev => prev + 1);
      })
  }

  // Effcet hook
  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [searchQuery])



  return (
    <div className='min-h-[700px] pt-[100px]  '>
      {loading && <Spinner />}

      {!loading && (
        <ContentWrapper>
          {
            data?.results?.length > 0 ? (
              <>
                {/* page title  */}
                <div className='text-2xl text-white mb-[25px] font-semibold'>
                  <span>
                    {`Search ${data?.total_results > 1 ? 'results' : 'result'} of `}
                  </span>
                  <span className='text-pink  '>
                    “{searchQuery}”
                  </span>
                </div>

                <InfiniteScroll
                  className='flex flex-wrap gap-[10px] md:gap-5 mb-[50px] '
                  dataLength={data?.results?.length || []}
                  next={fetchNextpageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {
                    data?.results?.map((item, ind) => {
                      if (item?.media_type === 'preson') return;
                      return (
                        <MovieCard
                          key={ind}
                          data={item}
                          fromSearch={true}
                        />
                      )
                    })}
                </InfiniteScroll>
              </>
            )
              :
              // if Result Not Found
              (<div className="flex flex-col items-center justify-center gap-6 font-bold">
                <p className='text-3xl text-orange'>Sorry, Results Not Found...!</p>

                <Link to='/'>
                  <button className='py-3 px-6 text-lg rounded-full search_btn_gradient'>
                    Home
                  </button>
                </Link>
              </div>)
          }
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult