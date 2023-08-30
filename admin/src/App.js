import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import NewUser from './pages/newUser/NewUser';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
} from 'react-router-dom';
import {
  hotelInputs,
  productInputs,
  roomInputs,
  userInputs,
} from './formSource';
import './style/dark.scss';
import './style/app.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/AuthContext';
import {
  hotelColumns,
  roomColumns,
  transactionColumns,
  userColumns,
} from './datatablesource';
import NewHotel from './pages/newHotel/NewHotel';
import NewRoom from './pages/newRoom/NewRoom';
import Edit from './pages/edit/Edit';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path='users'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':userId'
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title='Add New User' />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title='Add New User' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='hotels'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':hotelId'
                element={
                  <ProtectedRoute>
                    <Edit />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewHotel inputs={hotelInputs} title='Add New Hotel' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='rooms'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':productId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewRoom inputs={roomInputs} title='Add New Room' />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='transactions'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={transactionColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=':productId'
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path='new'
                element={
                  <ProtectedRoute>
                    <NewRoom inputs={roomInputs} title='Add New Room' />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
