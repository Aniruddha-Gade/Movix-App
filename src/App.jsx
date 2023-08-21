import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api'

import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGeners } from './redux/slices/homeSlice';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/home/Home';
import Details from './Pages/details/Details';
import CreditDetails from './Pages/details/creditDetails';
import SearchResult from './Pages/SearchResult';
import Explore from './Pages/Explore';
import PageNotFound from './Pages/PageNotFound';






function App() {

  const dispatch = useDispatch();

  // state - return the data of 'store' redux file  
  // const store = useSelector(state => state);
  // console.log('Store data is -->  ' ,store)


  const { url } = useSelector((state) => state.home);
  console.log('HomeSlice "Url" data is -->', url)


  useEffect(() => {
    fetchApiConfig();
    genersCall();

  }, [])


  const fetchApiConfig = () => {

    fetchDataFromApi('/configuration').then((res) => {
      console.log(`configuration data ---> `)
      console.log(res);

      // storing images 
      const url = {
        backdrop: res?.images?.secure_base_url + 'original',
        poster: res?.images?.secure_base_url + 'original',
        profile: res?.images?.secure_base_url + 'original',
      }


      dispatch(getApiConfiguration(url));
    });
  }

  // geners calling function 
  const genersCall = async () => {
    const promises = [];
    const endPoints = ['tv', 'movie'];
    const allGenres = {};

    endPoints.map((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })
    // console.log('promises data --> ',promises)

    // It will return all data, not one then one - it will be wait and return 
    const data = await Promise.all(promises);
    // console.log('data (promises) --> ', data)


    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })

    // console.log('allGenres -> ', allGenres)
    dispatch(getGeners(allGenres));
  }

  return (
    <div className='bg-black overflow-x-hidden '>
      <Header />

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/details/:mediaType/:id' element={<Details />} />
        <Route path='/search/:searchQuery' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='/details/:mediaType/:id/credit/:creditId' element={<CreditDetails />} />


        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
