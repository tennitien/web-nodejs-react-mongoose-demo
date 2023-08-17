import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import './navbar.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHideNav =
    location.pathname === '/register' || location.pathname === '/login';

  const register = () => navigate('/register');
  const login = () => navigate('/login');
  const { username } = useContext(AuthContext);

  const NavItem = (
    <div className='navItems'>
      <button className='navButton' onClick={register}>
        Register
      </button>
      <button className='navButton' onClick={login}>
        Login
      </button>
    </div>
  );
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to={'/'} className='logo'>
          Booking Website
        </Link>
        {username ? username.email : <NavItem />}
      </div>
    </div>
  );
};

export default Navbar;
