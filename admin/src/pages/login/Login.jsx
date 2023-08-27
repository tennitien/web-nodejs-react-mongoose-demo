import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthActions, AuthContext } from '../../context/AuthContext';

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
    try {
      const result = await axios.post('/auth/login', credential);
      dispatch({ type: AuthActions.login_success, payload: result.data });
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
