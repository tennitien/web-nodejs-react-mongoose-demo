import './app.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Transaction from './pages/transaction/Transaction';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:hotelId' element={<Hotel />} />
        <Route
          path='/transaction/:userId'
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
