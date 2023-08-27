export const WIDTH_ID = 250;
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
