import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { editUserInputs, hotelInputs, roomInputs, userInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import NewHotel from '../newHotel/NewHotel';
import NewUser from '../newUser/NewUser';
import { hotelApi } from '../../api/apiConfig';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import EditUser from '../../components/editUser/EditUser';
import EditHotel from '../../components/editHotel/EditHotel';
import EditRoom from '../../components/editRoom/EditRoom';

export default function Edit({ type }) {
  const { hotelId } = useParams();
  const { pathname } = useLocation();
  const model = pathname.split('/')[1];
  const id = pathname.split('/')[2];

  const { data, loading, error } = useFetch(`/${model}/detail/${id}`);

  let item;
  switch (type) {
    case 'users':
      item = (
        <EditUser inputs={editUserInputs} title='Edit User' defaultValues={data} />
      );
      break;
    case 'hotels':
      item = (
        <EditHotel
          inputs={hotelInputs}
          title='Edit Hotel'
          defaultValues={data}
        />
      );
      break;
    case 'rooms':
      item = (
        <EditRoom inputs={roomInputs} title='Edit Room' defaultValues={data} />
      );
      break;
    default:
      break;
  }
  return (
    <div className='page' id='edit'>
      {loading ? <Loading /> : <>{data && item}</>}
    </div>
  );
}
