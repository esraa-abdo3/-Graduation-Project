import axios from "axios";
import React, { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import './Admins.css'
import defultimgAdmin from '../../../assets/default_avatar.gif'
import AddAdmin from "./AddNewAdmin/AddAdmin";
import EditAdmin from "./EditAdmin";


export default function Users() {
    const [admins , setAdmins]= useState([]);
    const [result , setResult] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [openEdit, setOpenEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState(null);

    

    const cookie= new Cookies();
    const gettoken = cookie.get('Bearer');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const filteredAdmins = admins.filter(admin =>
    admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
    const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
    );

    const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
   const openPageEdit = (id) => {
  setSelectedAdminId(id);
  setOpenEdit(true);
};


  const closePageEdit = () => {
    setOpenEdit(false);
  };


    const getDataAdmins= async ()=>{
        try{
            const res= await axios.get('https://carenest-serverside.vercel.app/admin',{
                headers: {
                        Authorization: `${gettoken}`,
                    }
            })
            setAdmins(res.data.data)
            setResult(res.data.results)
        }catch(err){
            console.error('Failed to get Admins Data!');
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getDataAdmins();
    },[])

    return(
        <div className="DashAdmins">
            <div className='titleAdmins'>
                <h3>Admins ({result})</h3>
                <div className='boxSearch'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                    type="text"
                    placeholder="Search for name or email"
                    className="voiceSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-btn" onClick={openModal}>Add New Admin</button>
                <AddAdmin closeModal={closeModal} getDataAdmins={getDataAdmins} showModal={showModal}/>
            </div>

            <div className='tableWrapper'>
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Online</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                         <tr key={i} className="skeleton-row">
                        {[...Array(4)].map((_, j) => (
                            <td key={j}>
                                <div className="skeleton-cell"></div>
                            </td>
                        ))}
                        </tr>
                    ))
                ) : (
                    paginatedAdmins.map((admin) => (
                        <tr key={admin._id}>
                            <td className="tdimg">
                               {admin.image?<img src={admin.image} alt="imgAdmin" />: <img src={defultimgAdmin} alt="imgAdmin" />}
                                <p>{admin.firstName} {admin.lastName}</p>
                            </td>
                            <td>{admin.Email}</td>
                            <td>{admin.phone?admin.phone:"-----------"}</td>
                        <td>
                        {admin.online ? (
                        "True"
                        ) : (
                        "False"
                        )}
                        </td>
                        <td onClick={()=> openPageEdit(admin._id)} className='editAdmin'><i class="fa-solid fa-user-pen"></i>
                        </td>
                        </tr>
                    ))
                )}
            </tbody>
                </table>
                <EditAdmin openEdit={openEdit} getDataAdmins={getDataAdmins} closePageEdit={closePageEdit} idAdmin={selectedAdminId} />

            </div>
            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "activePage" : ""}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </button>
                ))}
            </div>
        </div>
    )
}