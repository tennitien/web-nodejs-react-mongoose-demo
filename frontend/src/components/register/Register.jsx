import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './register.css';
import Navbar from '../navbar/Navbar';
// validate
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required().max(6),
  fullName: yup.string().required(),
  email: yup.string().email('Email format is not valid').required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .max(10)
    .required(),
});

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);

  return (
    <div id='register'>
      <Navbar />
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
            <input type='submit' value='Register' />
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
