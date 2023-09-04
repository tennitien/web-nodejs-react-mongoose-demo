import './transaction.scss';
import { transactionApi } from '../../api/apiConfig';
import Datatable from '../../components/datatable/Datatable';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Loading from '../../components/loading/Loading';
import Footer from '../../components/footer/Footer';
import MailList from '../../components/mailList/MailList';
export default function Transaction() {
  let { userId } = useParams();
  const { data, loading, error } = useFetch(transactionApi.getById(userId));

  return (
    <>
      <Navbar />
      <div className='transaction'>
        <h2 className='title'>Your Transactions</h2>
        {loading ? <Loading /> : <Datatable data={data} />}
      </div>
      {!loading && (
        <>
          <MailList />
          <Footer />
        </>
      )}
    </>
  );
}
