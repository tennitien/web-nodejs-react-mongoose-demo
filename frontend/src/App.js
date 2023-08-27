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
  let item = {
    desc: 'descrio',
    title: 'Hello title',
    price: 300,
    maxPeople: 2,
    roomNumbers: [101, 102, 103],
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      // errorElement:<ErrorPage/>,
      children: [
        { index: true, element: <Home /> },
        { path: 'register', element: <Register /> },
        {
          path: 'hotels',
          children: [
            { index: true, element: <List /> },
            { path: ':hotelId', element: <Hotel /> },
          ],
        },
      ],
    },
  ]);
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
    // <div>hello app</div>
    // <RouterProvider router={router} />
  );
}

export default App;
