import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Datatable from '../../components/datatable/Datatable';
import useFetch from '../../hooks/useFetch';
import { transactionApi } from '../../api/apiConfig';
import { transactionColumns } from '../../datatablesource';
import Loading from '../../components/loading/Loading';

const Home = () => {
  const { data, loading, error } = useFetch(transactionApi.getSummary);

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='widgets'>
          {loading ? <Loading /> : <Widget data={data} />}
        </div>
        <div className='charts'>
        </div>
        <div className='listContainer'>
          <div className='listTitle'>Latest Transactions</div>
          <Datatable columns={transactionColumns} action={false} />
        </div>
      </div>
    </div>
  );
};

export default Home;
