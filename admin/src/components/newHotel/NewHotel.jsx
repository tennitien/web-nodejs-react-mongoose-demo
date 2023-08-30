import './newHotel.scss';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';

const NewHotel = ({ inputs, title }) => {
  const [postLoading, setPostLoading] = useState(false);

  // const { data, loading, error } = useFetch('/rooms');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async data => {
    setPostLoading(true);
    const { photos, ...other } = data;

    try {
      const list = await Promise.all(
        Object.values(photos).map(async photo => {
          const data = new FormData();
          data.append('file', photo);
          data.append('upload_preset', 'upload');
          const uploadRes = await axios.post(
            'https://api.cloudinary.com/v1_1/dj6nt0z1u/image/upload',
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );
      const newHotel = {
        ...other,
        photos: list,
      };

      await axios.post('/hotels', newHotel);
      alert('The hotel has been added');
      setPostLoading(false);
      reset();
    } catch (err) {
      console.log(err);
    }
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
            {/* img */}
            <div className='formInput formImg'>
              <label htmlFor='file'> Image </label>
              {/* <input
                type='file'
                id='file'
                multiple
                {...register('photos', { required: true })}
              /> */}
              <input
                type='text'
                id='file'
                multiple
                {...register('photos', { required: true })}
              />
              {errors.photos && (
                <p className='error'>{`This image is required`}</p>
              )}
            </div>
            {/*  */}
            <div className='formInput'>
              <label>Featured</label>
              <select
                className='selectFeatured'
                id='featured'
                // defaultValue={}
                {...register('featured', { required: true })}
              >
                <option disabled value=''>
                  Select
                </option>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </select>
              {errors.featured && (
                <p className='error'>{`This featured is required`}</p>
              )}
            </div>
            {/* <div className='formInput selectRooms'>
              <label>Rooms</label>
              <select
                id='rooms'
                multiple
                {...register('rooms', { required: true })}
              > */}
            {/* {loading
                  ? 'Loading...'
                  : data &&
                    data.map(room => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))} */}
            {/* </select>
              {errors.rooms && (
                <p className='error'>{`This rooms is required`}</p>
              )}
            </div> */}
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
};

export default NewHotel;
