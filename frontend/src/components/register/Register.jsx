import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../navbar/Navbar';
import { useState } from 'react';
import axios from 'axios';
import { authApi } from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
// validate
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().min(6),
  fullName: yup.string().required(),
  email: yup.string().email('Email format is not valid').required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10)
    .required(),
});

export default function Register() {
  const navigate = useNavigate();
  const [postLoading, setPostLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async data => {
    const account = { ...data, isAdmin: false };
    setPostLoading(true);
    try {
      await axios.post(authApi.register, account);
      alert('You have successfully registered.');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message);
    }
    setPostLoading(false);
  };

  return (
    <div id='register'>
      <Navbar />
      <div className='formContainer'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formRegister'>
            <div className='formControl'>
              <label>Your User Name:</label>
              <input {...register('username')} placeholder='User Name' />
              <p>{errors.username?.message}</p>
            </div>{' '}
            <div className='formControl'>
              <label>Your Full Name:</label>
              <input {...register('fullName')} placeholder='Full Name' />
              <p>{errors.name?.message}</p>
            </div>
            <div className='formControl'>
              <label>Your Email:</label>
              <input {...register('email')} placeholder='Email' />
              <p>{errors.email?.message}</p>
            </div>{' '}
            <div className='formControl'>
              <label>Your Phone Number:</label>
              <input {...register('phone')} placeholder='Phone Number' />
              <p>{errors.phone?.message}</p>
            </div>{' '}
            <div className='formControl'>
              <label>Your Password:</label>
              <input
                type='password'
                {...register('password')}
                placeholder='Password'
              />
              <p>{errors.password?.message}</p>
            </div>{' '}
            <div className='formAction'>
              <input
                type='submit'
                disabled={postLoading}
                value={postLoading ? 'Sending...' : 'Register'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
