import { useContext, useState } from 'react';
import { AuthActions, AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '../navbar/Navbar';
import { authApi } from '../../api/apiConfig';

function Login() {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [postLoading, setPostLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  if (user) {
    return <Navigate to='/' />;
  }

  const onSubmit = async data => {
    setPostLoading(true);

    dispatch({ type: AuthActions.login_start });
    try {
      const result = await axios.post(authApi.postLogin, data);
      dispatch({
        type: AuthActions.login_success,
        payload: result.data.details,
      });
      navigate('/');
    } catch (error) {
      dispatch({
        type: AuthActions.login_failure,
        payload: error.response.data,
      });
      alert(error.response.data.message);
    }

    setPostLoading(false);
  };
  return (
    <div id='login'>
      <Navbar />

      <div className='formContainer'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='formControl'>
            <label>Your User Name:</label>
            <input {...register('username')} placeholder='User Name' />
            <p>{errors.username?.message}</p>
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
              value={postLoading ? 'Sending...' : 'Login'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
