import './newRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import { hotelApi, roomApi } from '../../api/apiConfig';
import axios from 'axios';

const NewRoom = ({ inputs, title }) => {
  const [file, setFile] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const { data, loading, error } = useFetch(hotelApi.getHotels);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    const { rooms, hotelId, ...other } = data;
    const roomNumbers = rooms.split(',');
    const newRoom = { ...other, hotelId, roomNumbers };
    setPostLoading(true);
    try {
      await axios.post(roomApi.createRoom(hotelId), newRoom);
      setPostLoading(false);
      alert('The room has been added');
      reset();
    } catch (error) {
      console.log(error);
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
            {inputs &&
              inputs.map(input => (
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
            <div className='formBottom'>
              <div className='formInput'>
                <label htmlFor='rooms'>Rooms</label>
                <textarea
                  id='rooms'
                  cols='30'
                  rows='3'
                  {...register('rooms', { required: true })}
                  placeholder='give comma between room numbers'
                />
                {errors.rooms && (
                  <p className='error'>{`This rooms is required`}</p>
                )}
              </div>
              <div className='formInput'>
                <label>Choose a hotel</label>
                <select
                  {...register('hotelId', { required: true })}
                  defaultValue=''
                >
                  <option disabled value=''>
                    Select Hotel
                  </option>
                  {loading
                    ? 'loading...'
                    : data.map(opt => (
                        <option key={opt._id} value={opt._id}>
                          {opt.name}
                        </option>
                      ))}
                </select>
                {errors.hotel && (
                  <p className='error'>This field is required</p>
                )}
              </div>
              <div className='formAction'>
                <input
                  type='submit'
                  className='submit submit-hotel'
                  value={postLoading ? 'Loading...' : 'Send'}
                  disabled={postLoading}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
