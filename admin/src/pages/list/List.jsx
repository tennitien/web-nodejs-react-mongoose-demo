import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Datatable from '../../components/datatable/Datatable';

const List = ({ columns, action = true, title }) => {
  return (
    <div className='page' id='list'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <Datatable columns={columns} action={action} title={title} />
      </div>
    </div>
  );
};

export default List;
