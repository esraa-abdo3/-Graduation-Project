import React, { useEffect, useState } from 'react'
import './Reports.css'
import axios from 'axios';
import Cookies from "universal-cookie";
import defultimgReport from '../../../assets/default_avatar.gif'

export default function Reports() {
    const [reports ,settReports] = useState([]);
    const [typeReport , setTypeReport] = useState([]);
    const [type ,setType] =useState('');
    const [loading, setLoading] = useState(true);
    const [idReport ,setIdReport]= useState('');
    const [errormsg ,setErrormsg] = useState('')
    const [Donemsg ,setDonemsg] = useState('')
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);


    const cookie= new Cookies();
    const gettoken = cookie.get('Bearer');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(typeReport.length / itemsPerPage);
    const paginatedReports = typeReport.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );



    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
    const getAllReports = async (typeToFilter = type) => {
    try {
        const res = await axios.get('https://carenest-serverside.vercel.app/report', {
            headers: {
                Authorization: `${gettoken}`,
            }
        });
        settReports(res.data.data);
        setType(typeToFilter);
        const filtered = res.data.data.filter(item => item.userType === typeToFilter);
        setTypeReport(filtered);
    } catch (err) {
        console.log('Failed to get all reports', err);
    } finally {
        setLoading(false);
    }
    };

    // const filterData = (type)=>{
    //     const result = reports.filter(item => item.userType === type)
    //     setType(type);
    //     setTypeReport(result);
    // }
    const deleteReport=async (id)=>{
        try{
            const res = await axios.delete(`https://carenest-serverside.vercel.app/report/${id}`,{
                headers: {
                        Authorization: `${gettoken}`,
                    }
            })
            setDonemsg('Deleted successfully')
            await getAllReports(type);

        }catch(err){
            console.log('Failed to delete the Report!');
            setErrormsg('Failed to delete the Report!');
        }
    }

    useEffect(()=>{
        getAllReports("doctor");
    },[])
    
  return (
    <div className='DashReports'>
        <div className='titleReports'>
            <h3>Reports List ({typeReport.length})</h3>
        </div>

        <div className='filter-btn'>
            <h4>{type === 'customer'? "Customer" : 'Doctors'}</h4>
            <div>
                <button onClick={()=> getAllReports('doctor')} className={type === 'doctor' ? 'activeReports' : 'base-class'}>Doctors</button>
                <button onClick={() =>getAllReports('customer')} className={type === 'customer' ? 'activeReports' : 'base-class'}>Customers</button>
            </div>
        </div>


        <div className='tableWrapper'>
                        <table>
                        <thead>
                            <tr>
                                <th>Report Date</th>
                                <th>Doctor Name</th>
                                <th>Complaints Details</th>
                                <th>Status</th>
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
                            ( paginatedReports.length > 0?
                                paginatedReports.map((Report) => (
                                <tr key={Report._id}>
                                    <td>{formatDate(Report.date)}</td>
                                    <td className="tdimg">
                                       {Report.image?<img src={Report.userId.image} alt="imgReport" />: <img src={defultimgReport} alt="imgReport" />}
                                        <p>{Report.userId.firstName} {Report.userId.lastName}</p>
                                    </td>
                                    <td>{Report.complaintsDetails}</td>
                                <td>
                                {Report.status === "pending" ? (
                                <p className='pendingReport'>Pending</p>
                                ) : (
                                <p className='completedReport'>completed</p>
                                )}
                                </td>
                                <td onClick={()=>{ setIdReport(Report._id) ,setShowConfirmPopup(true)}} className='deleteNoti'><i className="fa-regular fa-calendar-xmark"></i></td>
                                </tr>
                            )):
                            <tr>
                                <td colSpan="4" style={{textAlign:"center"}}>There are no reports yet!</td>
                            </tr>
                            )
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
                    <p>Are you sure to delete This Report?</p>
                    <div className="popup-buttons">
                        <button className='cancelDel' onClick={() => {setShowConfirmPopup(false)}}>Cancel</button>
                        <button
                        className='confirmDel'
                        onClick={async () => {
                        await deleteReport(idReport);
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
