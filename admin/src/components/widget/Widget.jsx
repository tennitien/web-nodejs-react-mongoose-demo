import './widget.scss';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Widget = ({ data }) => {
  const listWidget = [
    {
      title: 'USERS',
      isMoney: false,
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
    },
    {
      title: 'ORDERS',
      isMoney: false,
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
    },
    {
      title: 'EARNINGS',
      isMoney: true,
      amount: data.earings,
      icon: (
        <MonetizationOnOutlinedIcon
          className='icon'
          style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
        />
      ),
    },
    {
      title: 'BALANCE',
      isMoney: true,
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
    },
  ];

  return (
    <>
      {listWidget.map((item, i) => (
        // <div className='widgetItem' key={i}>
        //   <span className='title'>{item.title}</span>
        //   <span className='counter'>
        //     {item.isMoney && '$'} {item.amount}
        //   </span>
        // </div>
        <div className='widget' key={i}>
          <div className='left'>
            <span className='title'>{item.title}</span>
            <span className='counter'>
              {item.isMoney && '$'} {item.amount}
            </span>
          </div>
          <div className='right'>{item.icon}</div>
        </div>
      ))}
    </>
  );
};

export default Widget;
