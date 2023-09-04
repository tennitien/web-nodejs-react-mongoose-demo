import './hotel.scss';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import { hotelsApi } from '../../api/apiConfig';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';
import Loading from '../../components/loading/Loading';

const Hotel = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);

  const { data, loading, error } = useFetch(hotelsApi.getById(hotelId));
  const { destination, dates, options, diffDay } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const handleOpen = i => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = direction => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleReserve = () => {
    if (user) {
      setOpenReserve(prev => !prev);
    } else navigate('/login');
  };

  let name = data?.name || '';
  let title = data?.title || '';
  let address = data?.address || '';
  let distance = data?.distance || '';
  let description = data?.desc || '';
  let price = data?.cheapestPrice || '';
  let photos = data?.photos || '';
  // console.log(data);

  let score = 9.8;
  return (
    <>
      <Navbar />
      <Header type='list' />

      {loading ? (
        <Loading/>
      ) : (
        <div className='hotelContainer'>
          {open && (
            <div className='slider'>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className='close'
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className='arrow'
                onClick={() => handleMove('l')}
              />
              <div className='sliderWrapper'>
                <img
                  src={photos[slideNumber].src}
                  alt=''
                  className='sliderImg'
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className='arrow'
                onClick={() => handleMove('r')}
              />
            </div>
          )}
          <div className='hotelWrapper'>
            <button className='bookNow' onClick={handleReserve}>
              Reserve or Book Now!
            </button>
            <h1 className='hotelTitle'>{name}</h1>
            <div className='hotelAddress'>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{address}</span>
            </div>
            <span className='hotelDistance'>
              Excellent location – {distance}m from center
            </span>
            <span className='hotelPriceHighlight'>
              Book a stay over ${price} at this property and get a free airport
              taxi
            </span>
            <div className='hotelImages'>
              {photos &&
                photos.map((photo, i) => (
                  <div className='hotelImgWrapper' key={i}>
                    <img
                      onClick={() => handleOpen(i)}
                      src={photo}
                      alt=''
                      className='hotelImg'
                    />
                  </div>
                ))}
            </div>
            <div className='hotelDetails'>
              <div className='hotelDetailsTexts'>
                <h1 className='hotelTitle'>{title}</h1>
                <p className='hotelDesc'>{description}</p>
              </div>
              <div className='hotelDetailsPrice'>
                <h1>Perfect for a {diffDay}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {score}!
                </span>
                <h2>
                  <b>${price * diffDay * options.room}</b> ({diffDay} nights)
                </h2>
                <button onClick={handleReserve}>Reserve or Book Now!</button>
              </div>
            </div>
            {openReserve && <Reserve hotelId={hotelId} priceDefault={price} />}
          </div>

          <MailList />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Hotel;
