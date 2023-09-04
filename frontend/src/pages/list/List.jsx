import './list.scss';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import { hotelsApi } from '../../api/apiConfig';
import { SearchActions, SearchContext } from '../../context/SearchContext';

const List = () => {
  const location = useLocation();
  const { dispatch } = useContext(SearchContext);

  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(900);

  const handleOptions = (name, value) => {
    setOptions(prev => {
      return { ...prev, [name]: value };
    });
  };
  const { data, loading, error } = useFetch(
    hotelsApi.search(destination, minPrice, maxPrice)
  );
  const handleSearch = () => {
    dispatch({
      type: SearchActions.add,
      payload: { destination, dates, options },
    });
  };
  useEffect(() => {
    dispatch({
      type: SearchActions.add,
      payload: { destination, dates, options },
    });
  }, [destination, dates, options]);
  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input
                placeholder={destination}
                type='text'
                onChange={e => setDestination(e.target.value)}
              />
            </div>
            <div className='lsItem'>
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                'MM/dd/yyyy'
              )} to ${format(dates[0].endDate, 'MM/dd/yyyy')}`}</span>
              {openDate && (
                <DateRange
                  onChange={item => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    onChange={e => setMinPrice(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max price <small>per night</small>
                  </span>
                  <input
                    type='number'
                    className='lsOptionInput'
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Adult</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.adult}
                    onChange={e => handleOptions('adult', e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Children</span>
                  <input
                    type='number'
                    min={0}
                    className='lsOptionInput'
                    placeholder={options.children}
                    onChange={e => handleOptions('children', e.target.value)}
                  />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>Room</span>
                  <input
                    type='number'
                    min={1}
                    className='lsOptionInput'
                    placeholder={options.room}
                    onChange={e => handleOptions('room', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          {/*  */}
          <div className='listResult'>
            {data &&
              data.length > 0 &&
              data.map((item, index) => <SearchItem item={item} key={index} />)}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default List;
