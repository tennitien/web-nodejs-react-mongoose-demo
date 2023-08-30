import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = ({columns}) => {
  return (
    <div className="page" id="list">
      <Sidebar/>
      <div className="container">
        <Navbar/>
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List