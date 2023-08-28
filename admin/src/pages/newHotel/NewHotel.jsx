import './newHotel.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useForm } from 'react-hook-form';

const NewHotel = ({ inputs, title }) => {
  const [files, setFiles] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const { data, loading, error } = useFetch('/rooms');

  const handleChange = e => {
    setInfo(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelectRoom = e => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setRooms(value);
    console.log('value :>> ', value);
  };

  const handleSend = async e => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async file => {
          const data = new FormData();
          data.append('file', file);
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
        ...info,
        rooms,
        photos: list,
      };
      console.log('newHotel :>> ', newHotel);
      // await axios.post('/hotels', newHotel);
    } catch (err) {
      console.log(err);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const { photos, ...other } = data;
    setPostLoading(true);

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
      setPostLoading(false);
      alert('The hotel has been added');
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
                {/* <input
                  id={input.id}
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  required
                /> */}
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
              <label htmlFor='file'>
                Image
                {/* : <DriveFolderUploadOutlinedIcon className='icon' /> */}
              </label>
              <input
                type='file'
                id='file'
                multiple
                onChange={e => setFiles(e.target.files)}
                {...register('photos', { required: true })}
                // style={{ display: 'none' }}
                // placeholder={<DriveFolderUploadOutlinedIcon className='icon' />}
              />
              {errors.photos && (
                <p className='error'>{`This image is required`}</p>
              )}
              {/* <img
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                }
                alt=''
              /> */}
            </div>
            {/*  */}
            <div className='formInput'>
              <label>Featured</label>
              <select
                className='selectFeatured'
                id='featured'
                defaultValue=''
                // onChange={handleChange}
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
            <div className='formInput selectRooms'>
              {/* <div className='formInput selectRooms'> */}
              <label>Rooms</label>
              {/* <select id='rooms' multiple onChange={handleSelectRoom}> */}
              <select
                id='rooms'
                multiple
                onChange={handleSelectRoom}
                {...register('rooms', { required: true })}
              >
                {loading
                  ? 'loading'
                  : data &&
                    data.map(room => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
              </select>
              {errors.rooms && (
                <p className='error'>{`This rooms is required`}</p>
              )}
            </div>
            <div className='formAction'>
              {/* <button type='submit' onClick={handleSend}> */}
              <input
                type='submit'
                // className={postLoading ? 'loading' : 'submit'}
                className='submit'
                value={postLoading ? 'Loading...' : 'Submit'}
                disabled={postLoading}
              />
            </div>
          </form>
        </div>
      </div>
      {/* img */}

      {/* </div> */}
    </div>
  );
};

export default NewHotel;
