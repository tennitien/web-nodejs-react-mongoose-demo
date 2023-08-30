import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import NewHotel from '../newHotel/NewHotel';
import NewUser from '../newUser/NewUser';
import { hotelApi } from '../../api/apiConfig';
import Loading from '../../components/loading/Loading';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import EditHotel from '../../components/editHotel/EditHotel';

export default function Edit() {
  const { hotelId } = useParams();
  const { data, loading } = useFetch(hotelApi.getById(hotelId));
  return (
    <div className='page' id='edit'>
      {loading ? (
        <Loading />
      ) : (
        <EditHotel inputs={hotelInputs} title='Edit Hotel' data={data} />
      )}
    </div>
  );
}
