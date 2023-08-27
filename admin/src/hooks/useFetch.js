import { useEffect, useState } from 'react';
import axios from 'axios';
const useFetch = url => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(url);
        setData(result.data);
        // setData(result.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchData();

    // const reFetch = async () => {
    //   setLoading(true);
    //   try {
    //     const result = await axios.get(url);
    //     setData(result.data);
    //   } catch (error) {
    //     setError(error);
    //   }

    //   setLoading(false);
    // };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
