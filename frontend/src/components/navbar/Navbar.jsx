import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthActions } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const register = () => navigate('/register');
  const login = () => navigate('/login');
  const transactions = () => navigate(`/transaction/${user._id}`);
  const logout = () => dispatch({ type: AuthActions.logout });

  const LoginItem = (
    <div className='navItems'>
      <button className='navButton' onClick={register}>
        Sign Up
      </button>
      <button className='navButton' onClick={login}>
        Login
      </button>
    </div>
  );
  const UserItem = (
    <div className='navItems'>
      <span>{user && user.email}</span>
      <button className='navButton' onClick={transactions}>
        Transactions
      </button>
      <button className='navButton' onClick={logout}>
        Logout
      </button>
    </div>
  );

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to={'/'} className='logo'>
          Booking Website
        </Link>
        {user ? UserItem : LoginItem}
      </div>
    </div>
  );
};

export default Navbar;
