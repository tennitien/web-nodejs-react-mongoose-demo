import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import useFetch from '../../hooks/useFetch';
import { transactionApi } from '../../api/apiConfig';

const Widget = ({ type }) => {
  let item;
  const { data, loading, error } = useFetch(transactionApi.getSummary);

  switch (type) {
    case 'user':
      item = {
        title: 'USERS',
        isMoney: false,
        link: 'See all users',
        amount: data.userCount,
        icon: (
          <PersonOutlinedIcon
            className='icon'
            style={{
              color: 'crimson',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
            }}
          />
        ),
      };
      break;
    case 'order':
      item = {
        title: 'ORDERS',
        isMoney: false,
        link: 'View all orders',
        amount: data.orders,
        icon: (
          <ShoppingCartOutlinedIcon
            className='icon'
            style={{
              backgroundColor: 'rgba(218, 165, 32, 0.2)',
              color: 'goldenrod',
            }}
          />
        ),
      };
      break;
    case 'earning':
      item = {
        title: 'EARNINGS',
        isMoney: true,
        link: 'View net earnings',
        amount: data.earings,
        icon: (
          <MonetizationOnOutlinedIcon
            className='icon'
            style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
          />
        ),
      };
      break;
    case 'balance':
      item = {
        title: 'BALANCE',
        isMoney: true,
        link: 'See details',
        amount: data.balance,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className='icon'
            style={{
              backgroundColor: 'rgba(128, 0, 128, 0.2)',
              color: 'purple',
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <>
      {loading ? (
        'loading...'
      ) : (
        <div className='widget'>
          <div className='left'>
            <span className='title'>{item.title}</span>
            <span className='counter'>
              {item.isMoney && '$'} {item.amount}
            </span>
            <span className='link'>{item.link}</span>
          </div>
          {/* <div className='right'>
        <div className='percentage positive'>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {item.icon}
      </div> */}
        </div>
      )}
    </>
  );
};

export default Widget;
