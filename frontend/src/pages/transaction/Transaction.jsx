import { transactionApi } from '../../api/apiConfig';
import Datatable from '../../components/datatable/Datatable';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
export default function Transaction() {
  let { userId } = useParams();
  const { data, loading, error } = useFetch(transactionApi.getById(userId));

  return (
    <div className='transaction'>
      {loading ? 'loading...' : <Datatable data={data} />}
    </div>
  );
}
