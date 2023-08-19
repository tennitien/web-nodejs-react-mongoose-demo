import { useState } from "react";
import "./login.scss"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()

  const [credential, setCredential] = useState({
    username: undefined,
    password: undefined,
  });

  const handleInput = e => {
    setCredential(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleLogin = e => {
    setCredential(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <div>
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
        <button onClick={handleLogin} className='lButton' >
          Login
        </button>
        {/* {error && <span>{error.message}</span>} */}
      </div>
    </div>
    </div>
  )
}

export default Login