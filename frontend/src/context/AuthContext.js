import { createContext, useEffect, useReducer } from 'react';
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
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
        user: null,
        loading: true,
        error: null,
      };
    case AuthActions.login_success:
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case AuthActions.login_failure:
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case AuthActions.logout:
      return {
        user: null,
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
    user: state.user,
    loading: state.loading,
    error: state.error,
    dispatch,
  };
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
