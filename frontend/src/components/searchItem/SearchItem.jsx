import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchItem.scss';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchItem = ({ item }) => {
  let name = item.name;
  let address = item.address;
  let distance = item.distance;
  let description = item.desc;
  let price = item.cheapestPrice;
  let rate = item.rating;
  let img = item.photos[0];
  let tagFree = 'Free airport taxi';
  let includes = 'Includes taxes and fees';

  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`${item._id}`);
  };
  return (
    <div className='searchItem'>
      <img src={img} alt='' className='siImg' />
      <div className='siDesc'>
        <h1 className='siTitle'>{name}</h1>
        <span className='siDistance'>{distance} from center</span>
        <span className='siTaxiOp'>{tagFree}</span>
        <span className='siSubtitle'>
          <FontAwesomeIcon icon={faLocationDot} /> {address}
        </span>
        <span className='siFeatures'>{description}</span>
        {/* If can cancel */}

        <div>
          <p className='siCancelOp'>Free cancellation </p>
          <p className='siCancelOpSubtitle'>
            You can cancel later, so lock in this great price today!
          </p>
        </div>
      </div>
      <div className='siDetails'>
        <div className='siRating'>
          <button>
            Rating ⭐️ : <span>{rate} </span>
          </button>
        </div>
        <div className='siDetailTexts'>
          <span className='siPrice'>${price}</span>
          <span className='siTaxOp'>{includes}</span>
          <button className='siCheckButton' onClick={handleDetail}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
