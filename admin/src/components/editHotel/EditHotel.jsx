import './editHotel.scss';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { hotelApi } from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';

export default function EditHotel({ inputs, title, defaultValues }) {
  const navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(false);
  const { photos, rooms, ...other } = defaultValues;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...other },
  });

  const onSubmit = async data => {
    const { _id, roomsDeleted, photosDeleted, ...otherUpdate } = data;
    let roomsUpdate = roomsDeleted
      ? rooms
          .filter(item => !roomsDeleted.includes(item._id))
          .map(item => item._id)
      : rooms;
    let photosUpdate = photosDeleted
      ? photos.filter(item => !photosDeleted.includes(item))
      : photos;
    let hotelUpdate = {
      ...otherUpdate,
      rooms: roomsUpdate,
      photos: photosUpdate,
    };
    setPostLoading(true);
    try {
      await axios.put(hotelApi.updateById(_id), hotelUpdate);
    } catch (error) {
      console.log('error :>> ', error);
    }
    setPostLoading(false);
    alert('The hotel has updated');
    navigate('/hotels');
  };
  return (
    <div className='new'>
      <Sidebar />
      <div className='newContainer'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <form onSubmit={handleSubmit(onSubmit)}>
            {inputs.map(input => (
              <div className='formInput' key={input.id}>
                <label>{input.label}</label>
                <input
                  type={input.type}
                  {...register(input.id, {
                    required: true,
                  })}
                  placeholder={input.placeholder}
                />
                {errors[input?.id] && (
                  <p className='error'>{`This ${input.id} is required`}</p>
                )}
              </div>
            ))}
            {/* Rooms */}
            <div className='formInput'>
              <Stack direction='row' justifyContent={'space-between'}>
                <label>Rooms</label>
                <span>
                  <DeleteForeverIcon />
                </span>
              </Stack>
              <div className='roomList'>
                {rooms &&
                  rooms.map(room => (
                    <div className='room' key={room._id}>
                      <span>{room.title}</span>
                      <span>
                        <input
                          type='checkbox'
                          value={room._id}
                          {...register('roomsDeleted')}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            {/* fea */}
            <div className='formInput'>
              <label>Featured</label>
              <select
                className='selectFeatured'
                id='featured'
                {...register('featured', { required: true })}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
            </div>
            <div className='formImgList'>
              <div className='imgLabel'>
                <label>Images</label>
                <span>
                  <DeleteForeverIcon />
                </span>
              </div>
              {photos &&
                photos.map((photo, i) => (
                  <div className='imgItem' key={i}>
                    <img src={photo} alt='' />
                    <span>
                      <input
                        type='checkbox'
                        value={photo}
                        {...register('photosDeleted')}
                      />
                    </span>
                  
                  </div>
                ))}
            </div>

            <div className='formAction'>
              <input
                type='submit'
                className='submit'
                value={postLoading ? 'Loading...' : 'Submit'}
                disabled={postLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
