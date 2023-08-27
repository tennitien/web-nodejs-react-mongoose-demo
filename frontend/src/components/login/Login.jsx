import React, { useContext, useState } from 'react';
import { AuthActions, AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate()
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const handleInput = e => {
    setCredential(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleLogin = async e => {
    e.preventDefault();
    dispatch({ type: AuthActions.login_start });
    // "proxy": "http://localhost:5000/api"
    try {
      const result = await axios.post('/auth/login', credential);
      dispatch({ type: AuthActions.login_success, payload: result.data.details });
      navigate('/')
    } catch (error) {
      console.log('error :>> ', error);
      dispatch({
        type: AuthActions.login_failure,
        payload: error.response.data,
      });
    }
  };

  return (
    <div className='login'>
      <div className='lContainer'>
        <input
          type='text'
          name='username'
          id='username'
          onChange={handleInput}
          className='lInput'
        />
        <input
          type='password'
          name='password'
          id='password'
          onChange={handleInput}
          className='lInput'
        />
        <button onClick={handleLogin} className='lButton' disabled={loading}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
