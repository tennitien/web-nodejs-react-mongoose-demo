import { createContext, useEffect, useReducer } from 'react';
const INITIAL_STATE = {
  username: JSON.parse(localStorage.getItem('username')) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthActions = {
  login_start: 'LOGIN_START',
  login_success: 'LOGIN_SUCCESS',
  login_failure: 'LOGIN_FAILURE',
  logout: 'LOGOUT',
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.login_start:
      return {
        username: null,
        loading: true,
        error: null,
      };
    case AuthActions.login_success:
      return {
        username: action.payload,
        loading: false,
        error: null,
      };
    case AuthActions.login_failure:
      return {
        username: null,
        loading: false,
        error: action.payload,
      };
    case AuthActions.logout:
      return {
        username: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const value = {
    username: state.username,
    loading: state.loading,
    error: state.error,
    dispatch,
  };
  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(state.username));
  }, [state.username]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
