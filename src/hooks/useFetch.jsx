import React, { useState, useEffect } from 'react'
import { fetchDataFromApi } from '../utils/api';

const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
                console.log(`Your Data for this url - ${url}  ---> `)
                console.log(res)
            })
            .catch((err) => {
                setLoading(false);
                setError('Something Went Wrong...! ')
                console.log(err);
            })


    }, [url])

    return { data, error, loading };

}

export default useFetch