import * as React from 'react';
import './datatable.scss';

export default function Datatable({ data }) {
  const head = [
    '#',
    'Hotel',
    'Room',
    'Date',
    'Price',
    'Payment Method',
    'Status',
  ];
  return (
    <table className='table'>
      <thead>
        <tr className='tableHead'>
          {head.map((item, i) => (
            <React.Fragment key={i}>
              <th>{item}</th>
            </React.Fragment>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i} className={`${i % 2 === 0 ? 'greyBg' : 'transparentBg'}`}>
            <td>
              {i < 10 ? '0' : ''}
              {i + 1}
            </td>
            <td className='hotelName'>{item.hotelName}</td>
            <td>
              {
                <>
                  {item.rooms
                    .map(room => room.roomNumbers.map(r => r))
                    .toString()}
                </>
              }
            </td>
            <td>
              {new Date(item.dateStart).toLocaleDateString('en-GB')} -{' '}
              {new Date(item.dateEnd).toLocaleDateString('en-GB')}
            </td>
            <td>${item.price}</td>
            <td className='payment'>{item.payment}</td>
            <td>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
