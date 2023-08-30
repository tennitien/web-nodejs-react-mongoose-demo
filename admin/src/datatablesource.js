export const WIDTH_ID = 150;

export const userColumns = [
  { field: '_id', headerName: 'ID', width: WIDTH_ID },
  {
    field: 'user',
    headerName: 'User',
    width: 230,
    renderCell: params => {
      return (
        <div className='cellWithImg'>
          <img
            className='cellImg'
            src={
              params.row.img ||
              'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg'
            }
            alt='avatar'
          />
          {params.row.username}
        </div>
      );
    },
  },
  { field: 'email', headerName: 'Email', width: 230 },
  { field: 'phone', headerName: 'Phone', width: 100 },
];

export const hotelColumns = [
  { field: '_id', headerName: 'ID', width: WIDTH_ID },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'city', headerName: 'City', width: 100 },
];
// _id,title,desc,price,maxPeople,action
export const roomColumns = [
  { field: '_id', headerName: 'ID', width: WIDTH_ID },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'desc', headerName: 'Description', width: 250 },
  { field: 'maxPeople', headerName: 'Max People', width: 100 },
];

export const transactionColumns = [
  { field: '_id', headerName: 'ID', width: 150 },
  { field: 'username', headerName: 'User', width: 100 },
  { field: 'hotelName', headerName: 'Hotel', width: 150 },
  { field: 'roomNumbers', headerName: 'Room', width: 150 },
  { field: 'date', headerName: 'Date', width: 200 },
  { field: 'price', headerName: 'Price', width: 100 },
  { field: 'payment', headerName: 'Payment Method', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    renderCell: params => {
      let status = params.row.status;
      return (
        <span className={`status ${status?.toLowerCase()}`}>{status}</span>
      );
    },
  },
];
