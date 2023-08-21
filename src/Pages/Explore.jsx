import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import useFetch from "../hooks/useFetch";
import { fetchDataFromApi } from "../utils/api";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";



let filters = {};

const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];



const Explore = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters)
      .then((res) => {
        setData(res);
        setPageNum(prev => prev + 1);
        setLoading(false);
      })
  }


  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      });
  }


  // Effect Hook 
  useEffect(() => {
    filters = {};
    setData(null);
    setPageNum(1);
    setSortby(null);
    setGenre(null);
    fetchInitialData();

  }, [mediaType]);


  const onChange = (selectedItems, action) => {
    if (action.name === 'sortby') {
      setSortby(selectedItems);
      if (action.name !== 'clear') {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by
      }
    }


    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }

    // console.log('filters data -> ', filters)
    // console.log('selectedItems -> ', selectedItems)
    setPageNum(1);
    fetchInitialData();
  };




  return (
    <div className="min-h-[700px] pt-[100px] ">
      <ContentWrapper>
        {/* page header */}
        <div className="flex flex-col md:flex-row justify-between mb-[25px]  ">
          {/* Page Title */}
          <div className="text-2xl text-white mb-5 md:mb-0 ">
            {
              mediaType === 'tv' ? 'Explore Tv Shows' : 'Explore Movies'
            }
          </div>

          {/* filters */}
          <div className="flex flex-col md:flex-row gap-[10px] ">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select genres"
              className="react-select-container genresDD "
              classNamePrefix="react-select"
            />

            <Select
              name="sortby"
              value={sortby}
              options={sortbyData}
              onChange={onChange}
              isClearable={true}
              placeholder="Sort by"
              className="react-select-container sortbyDD"
              classNamePrefix="react-select"
            />
          </div>
        </div>


        {loading && <Spinner initial={true} />}

        {
          !loading && (
            <>
              {
                data?.results?.length > 0 ? (
                  <InfiniteScroll
                    className="flex flex-wrap gap-[10px] mb-[50px] md:gap-5 "
                    dataLength={data?.results?.length || []}
                    next={fetchNextPageData}
                    hasMore={pageNum <= data?.total_pages}
                    loader={<Spinner />}
                  >
                    {
                      data?.results?.map((item, ind) => {
                        if (item.media_type === 'person') return;

                        return (
                          <MovieCard
                            key={ind}
                            data={item}
                            mediaType={mediaType}
                          />
                        )
                      })}
                  </InfiniteScroll>
                )
                  :

                  // if There is no data 
                  (<span className="flex items-center pt-[15%] justify-center text-2xl text-orange font-bold">
                    Sorry, Results Not Found...!
                  </span>)
              }
            </>
          )
        }
      </ContentWrapper>
    </div>
  )
}

export default Explore