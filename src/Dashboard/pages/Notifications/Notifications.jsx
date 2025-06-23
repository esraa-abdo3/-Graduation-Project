import React, { useEffect, useState } from "react"
import  './Notifications.css'
import axios from "axios";
import Cookies from "universal-cookie";
import AddNotification from "./AddNotification";


export default function Notifications() {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [notifications,setNotfications] =useState([]);
    const [result , setResult] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [errormsg ,setErrormsg] = useState('')
    const [Donemsg ,setDonemsg] = useState('')
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [idNoti ,setIdNoti]= useState('');


    const cookie= new Cookies();
    const gettoken = cookie.get('Bearer');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const filteredNotifi = notifications.filter(notification =>
        notification.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredNotifi.length / itemsPerPage);
    const paginatedNotif = filteredNotifi.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    const openModal = () => {
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
    };

    const getAllNotif = async ()=>{
        try{
            const res =await axios.get('https://carenest-serverside.vercel.app/user/notifications/all',{
                headers: {
                        Authorization: `${gettoken}`,
                    }
            })
            console.log('the notifictions: ',res.data.data);
            setNotfications(res.data.data);
            setResult(res.data.results);

        }catch(err){
            console.log('Failed to get All Notifications!',err);
        }finally{
            setLoading(false);
        }
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const deleteNotification=async (id)=>{
        try{
            const res = await axios.delete(`https://carenest-serverside.vercel.app/user/notifications/${id}`,{
                headers: {
                        Authorization: `${gettoken}`,
                    }
            })
            setDonemsg('Deleted successfully')
            await getAllNotif();
        }catch(err){
            console.log('Failed to delete the Notification!');
            setErrormsg('Failed to delete the Notification!');
        }
    }


    useEffect(()=>{
        getAllNotif();
    },[])
  return (
    <div className='DashNotif'>
        <div className='titleAdmins'>
            <h3>Notifications ({result})</h3>
            <div className='boxSearch'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                type="text"
                placeholder="Search for Title`s Notification"
                className="voiceSearch"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button onClick={openModal} className="add-btn">Add New Notification</button>
            <AddNotification closeModal={closeModal} getAllNotif={getAllNotif} showModal={showModal}/>
        </div>

        <div className='tableWrapper'>
                        <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Sender</th>
                                <th>Send to</th>
                                <th>Send at</th>
                                <th>Read</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                 <tr key={i} className="skeleton-row">
                                {[...Array(6)].map((_, j) => (
                                    <td key={j}>
                                        <div className="skeleton-cell"></div>
                                    </td>
                                ))}
                                </tr>
                            ))
                        ) : (
                            paginatedNotif.map((notifi) => (
                                <tr key={notifi._id}>
                                    <td><p style={{fontWeight:'bold'}}>{notifi.title}</p>{notifi.message}</td>
                                    <td>{notifi.sendBy?.firstName}{notifi.sendBy?.lastName}</td>
                                    <td>{notifi.recipient?.firstName}{notifi.recipient?.lastName}</td>
                                    <td>{formatDate(notifi.createdAt)}</td>
                                <td>
                                {notifi.read ? (
                                "True"
                                ) : (
                                "False"
                                )}
                                </td>
                                <td onClick={()=>{ setIdNoti(notifi._id) ,setShowConfirmPopup(true)}} className='deleteNoti'><i className="fa-regular fa-calendar-xmark"></i></td>
                            
                                </tr>
                            ))
                        )}
                    </tbody>
                        </table>
        
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

        {showConfirmPopup && (
            <div className="popup-overlay">
                <div className="popup-box">
                    <p>Are you sure to delete This Notification?</p>
                    <div className="popup-buttons">
                        <button className='cancelDel' onClick={() => {setShowConfirmPopup(false)}}>Cancel</button>
                        <button
                        className='confirmDel'
                        onClick={async () => {
                        await deleteNotification(idNoti);
                        setShowConfirmPopup(false);
                        setDonemsg('')
                        setErrormsg('')
                        }}>Confirm</button>

                    </div>
                    {errormsg && <p className="error-message">{errormsg}</p>}
                    {Donemsg && <p className="success-message">{Donemsg}</p>}

                </div>
            </div>
        )}
    </div>
  )
}
