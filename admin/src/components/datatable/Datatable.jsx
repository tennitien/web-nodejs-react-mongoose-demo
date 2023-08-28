import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { userApi } from '../../api/apiConfig';
import axios from 'axios';

const Datatable = ({ columns, action = true, pageSize = 9 }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/')[1];
  const path = pathName === '' ? 'transactions?limit=8' : pathName;
  const [list, setList] = useState();
  const [id, setId] = useState(null);
  const { data, loading, error } = useFetch(`/${path}`);
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async id => {
    if (window.confirm('Are your sure?')) {
      try {
        const result = await axios.delete(`/${path}/${id}`);
        if (result.status === 200) {
          alert(result.data);
          setList(list.filter(item => item._id !== id));
        }
      } catch (error) {
        alert(error?.response.data.message);
        console.log('error :>> ', error);
      }
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: params => {
        return (
          <div className='cellAction'>
            <Link to='/users/test' style={{ textDecoration: 'none' }}>
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      {loading ? (
        'loading...'
      ) : (
        <div className='datatable'>
          {action && (
            <div className='datatableTitle'>
              Add New
              <Link to={`/${path}/new`} className='link'>
                Add New
              </Link>
            </div>
          )}
          {list && (
            <DataGrid
              className='datagrid'
              rows={list}
              // columns={columns}
              columns={action ? columns.concat(actionColumn) : columns}
              pageSize={pageSize}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Datatable;
