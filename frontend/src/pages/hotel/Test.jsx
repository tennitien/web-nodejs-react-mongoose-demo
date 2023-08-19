import React from 'react';
import useFetch from '../../hooks/useFetch';
import { hotelsApi } from '../../api/apiConfig';

export default function Test({ hotelId }) {
  const { data, loading, error } = useFetch(hotelsApi.getRooms(hotelId));
  console.log('data-test :>> ', data);
  return (
    <div className='reserver-test'>
      <p>select your rooms:</p>
      {data.map(item => (
        <div className='rItem'>
          <div className='ItemInfo'>
            <p>{item.title}</p>
            <p>{item.desc}</p>
            <p>{item.maxPeople}</p>
          </div>
          <div>
            Room number:
            {item.roomNumbers.map(room => (
              <div className='room'>
                <label>{room}</label>
                <input type='ch' value={room} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
