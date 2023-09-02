import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import './app.css';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Register from './components/register/Register';
import Root from './components/Root';
import Login from './components/login/Login';
import Transaction from './pages/transaction/Transaction';

function App() {

   return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:hotelId' element={<Hotel />} />
        <Route path='/transaction/:userId' element={<Transaction />} />
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
