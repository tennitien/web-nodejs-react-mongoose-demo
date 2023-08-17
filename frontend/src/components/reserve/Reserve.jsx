import React from 'react';
import './reserve.css';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format, isDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useFetch from '../../hooks/useFetch';
import { hotelsApi } from '../../api/apiConfig';

// validate Form
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Email format is not valid')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10)
    .required('Phone is required'),
  card: yup.string().required('Card is required'),
});
// validate Form --end

function Reserve({ hotelId, dates }) {
  const { data, loading, error } = useFetch(hotelsApi.getRooms(hotelId));
  console.log('data :>> ', data);
  // let desc = item.desc;
  // let title = item.title;
  // let price = item.price;
  // let maxPeople = item.maxPeople;
  // let roomNumbers = item.roomNumbers;
  const [date, setDate] = useState([
    {
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      key: 'selection',
    },
  ]);

  // const [rooms, setRooms] = useState([]);
  const [dataForm, setDataForm] = useState({});
  // const checkRoom = event => {
  //   const { value, checked } = event.target;
  //   if (checked) setRooms(prev => [...prev, value]);
  //   else setRooms(prev => prev.filter(room => room !== value));
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   name: '',
    //   email: '',
    //   phone: '',
    //   card: '',
    // },
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    setDataForm({
      ...data,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      numberOfDay:
        (date[0].endDate - date[0].startDate) / (1000 * 60 * 60 * 24),
    });
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='reserve'>
            <div className='formDate'>
              <h2>Dates</h2>
              <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />
            </div>

            <div className='formInfo'>
              <h2>Reserve Info</h2>
              <div className='formControl'>
                <label>Your Full Name:</label>
                <input {...register('name')} placeholder='Full Name' />
                <p>{errors.name?.message}</p>
              </div>
              <div className='formControl'>
                <label>Your Email:</label>
                <input {...register('email')} placeholder='Email' />
                <p>{errors.email?.message}</p>
              </div>
              <div className='formControl'>
                <label>Your Phone Number:</label>
                <input {...register('phone')} placeholder='Phone Number' />
                <p>{errors.phone?.message}</p>
              </div>
              <div className='formControl'>
                <label>Your Identity Card Number</label>
                <input {...register('card')} placeholder='Phone Number' />
                <p>{errors.card?.message}</p>
              </div>
            </div>
            {/*//todo select */}
            <div className='selectRooms'>
              <h2>Select Room</h2>
              <div className='rooms'>
                {data &&
                  data.map(room => {
                    return (
                      <div className='roomInfo'>
                        <div className='roomDesc'>
                          <p className='title'>{room.title}</p>
                          <p>{room.desc}</p>
                          <p className='people'>
                            Max people: <strong>{room.maxPeople}</strong>
                          </p>
                          <p className='price'>${room.price}</p>
                        </div>
                        <div className='room'>
                          {room &&
                            room.roomNumbers.map(roomNumber => (
                              <div className='formCheckbox'>
                                <label>{roomNumber}</label>
                                <input
                                  type='checkbox'
                                  value={{ roomNumber }}
                                  {...register('rooms')}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className='bill'>
              <h2>Total Bill: ${}</h2>
              <select {...register('payment')}>
                <option value='cash'>cash</option>
                <option value='credit'>credit</option>
                <option value='other'>other</option>
              </select>
              <input type='submit' />
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Reserve;
