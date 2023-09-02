import './editUser.scss';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { roomApi, userApi } from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

export default function EditHotel({ inputs, title, defaultValues }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(defaultValues.img || '');
  const [postLoading, setPostLoading] = useState(false);
  const [postErr, setPostErr] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...defaultValues },
  });

  const onSubmit = async data => {
    const imgUpload = new FormData();
    imgUpload.append('file', data.img[0]);
    imgUpload.append('upload_preset', 'upload');

    setPostLoading(true);

    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dj6nt0z1u/image/upload',
        imgUpload
      );
      const { url } = uploadRes.data;
      setFile(url);
      const { img, ...other } = data;
      const userUpdate = { ...other, img: url };
      console.log('userUpdate :>> ', userUpdate);
      await axios.put(userApi.updateById(data._id), userUpdate);

      setPostLoading(false);
      // alert('The user has updated');
    } catch (error) {
      console.log('error :>> ', error);
      setPostErr(true);
    }
    alert(postErr ? 'Can not update' : 'The user has updated');
    // navigate('/users');
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
          <div className='left'>
            <img
              src={
                file
                  ? file
                  : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
              }
              alt=''
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='formInput'>
                <label htmlFor='img'>
                  Image: <DriveFolderUploadOutlinedIcon className='icon' />
                </label>
                <input
                  type='file'
                  id='img'
                  {...register('img')}
                  style={{ display: 'none' }}
                />
              </div>
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
    </div>
  );
}
