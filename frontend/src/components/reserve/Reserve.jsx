import React, { useContext, useEffect } from 'react';
import './reserve.css';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format, isDate } from 'date-fns';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useFetch from '../../hooks/useFetch';
import { hotelsApi } from '../../api/apiConfig';
import { SearchContext } from '../../context/SearchContext';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

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

function Reserve({ hotelId, priceDefault }) {
  const { data, loading, error } = useFetch(hotelsApi.getRooms(hotelId));
  const { dates } = useContext(SearchContext);
  const { username } = useContext(AuthContext);
  const [date, setDate] = useState([
    {
      startDate: new Date(dates[0].startDate),
      endDate: new Date(dates[0].endDate),
      key: 'selection',
    },
  ]);

  const [dataForm, setDataForm] = useState({});
  const [totalBill, setTotalBill] = useState(0);

  let defaultValues = {
    name: username.fullName,
    email: username.email,
    phone: username.phone,
    card: '',
  };
  const form = useForm({ defaultValues, resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = input => {
    const { name, email, phone, card, payment, ...rooms } = input;
    setDataForm({
      name,
      email,
      phone,
      card,
      payment,
      rooms,
      startDate: date[0].startDate,
      endDate: date[0].endDate,
      diffDay:
        (new Date(date[0].endDate) - new Date(date[0].startDate)) /
          (1000 * 60 * 60 * 24) +
        1,
    });
    console.log('rooms :>> ', rooms);
    let sum = 0;
    for (const key in rooms) {
      if (rooms[key].value) {
        let quantity = rooms[key].value.length;
        let price = rooms[key].price;
        sum += price * quantity;
      }
    }
    setTotalBill(sum)
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
                <label>
                  Your Full Name <span>*(required)</span>
                </label>
                <input {...register('name')} placeholder='Full Name' />
                <p>{errors.name?.message}</p>
              </div>
              <div className='formControl'>
                <label>
                  Your Email <span>*(required)</span>
                </label>
                <input {...register('email')} placeholder='Email' />
                <p>{errors.email?.message}</p>
              </div>
              <div className='formControl'>
                <label>
                  Your Phone Number <span>*(required)</span>
                </label>
                <input {...register('phone')} placeholder='Phone Number' />
                <p>{errors.phone?.message}</p>
              </div>
              <div className='formControl'>
                <label>
                  Your Identity Card Number <span>*(required)</span>
                </label>
                <input {...register('card')} placeholder='Your card number' />
                <p>{errors.card?.message}</p>
              </div>
            </div>
            {/*//todo select */}
            <div className='selectRooms'>
              <h2>Select Room</h2>

              <div className='rooms'>
                {data &&
                  data.map((room, i) => {
                    return (
                      <div className='room' key={i}>
                        <div className='roomDesc'>
                          <p className='title'>{room.title}</p>
                          <p>{room.desc}</p>
                          <p className='people'>
                            Max people: <strong>{room.maxPeople}</strong>
                          </p>
                          <p className='price'>${room.price}</p>
                        </div>
                        <div className='roomNumbers'>
                          {room &&
                            room.roomNumbers.map((roomNumber, i) => (
                              <div className='formCheckbox' key={i}>
                                <label>{roomNumber}</label>
                                <input
                                  type='checkbox'
                                  value={roomNumber}
                                  {...register(`${room._id}.value`)}
                                />
                                <input
                                  type='text'
                                  hidden={true}
                                  value={room.price}
                                  {...register(`${room._id}.price`)}
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
            <h2 className='bill-title'>Total Bill: ${totalBill* dataForm.diffDay || priceDefault }</h2>
              <select {...register('payment')} className='select'>
                <option value="hide">Select Payment Method</option>
                <option value='cash'>cash</option>
                <option value='credit'>credit</option>
                <option value='other'>other</option>
              </select>
              
              <div className="formAction">
              <input type='submit' value='Reserve Now'/>
              </div>

            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Reserve;
