import { useContext, useState } from 'react';
import './login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthActions, AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { authApi } from '../../api/apiConfig';

function Login({ inputs }) {
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const [postLoading, setPostLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = async data => {
    const credential = { ...data };

    dispatch({ type: AuthActions.login_start });
    setPostLoading(true);

    try {
      const result = await axios.post(authApi.adminLogin, credential);
      dispatch({ type: AuthActions.login_success, payload: result.data });
      navigate('/');
    } catch (error) {
      // console.log('error :>> ', error);
      alert(error.response.data.message);
      dispatch({
        type: AuthActions.login_failure,
        payload: error.response.data.message,
      });
    }
    setPostLoading(false);
  };
  return (
    <div className='login'>
      <h1 className='title'>Login</h1>

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
  );
}

export default Login;
