import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
