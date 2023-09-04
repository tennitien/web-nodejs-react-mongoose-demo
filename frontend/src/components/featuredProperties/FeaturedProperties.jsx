import './featuredProperties.scss';
import { hotelsApi } from '../../api/apiConfig';
import useFetch from '../../hooks/useFetch';
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    hotelsApi.sortBy('des', 3, 'rating')
  );

  return (
    <div className='featuredProperties'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data &&
            data.map((item, i) => (
              <div className='fpItem' key={i}>
                <img src={item.photos[0]} alt={item.name} className='fpImg' />
                <span className='fpName'>
                  <Link to={`/hotels/${item._id}`} target='_blank'>
                    {item.name}
                  </Link>
                </span>
                <span className='fpCity'>{item.city}</span>
                <span className='fpPrice'>
                  Starting from ${item.cheapestPrice}
                </span>
                <div className='fpRating'>
                  <button>{item.rating}/5</button>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
