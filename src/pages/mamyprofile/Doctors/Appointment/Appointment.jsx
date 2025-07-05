import { useEffect, useState } from 'react';
import './Appointment.css';
import Mainnavbar from '../../../../Componets/mainhomeprofile/Mainnavbar';
import axios from 'axios';
import Cookies from "universal-cookie";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');
  const [options, setOptions] = useState("All");
  const [deletedIds, setDeletedIds] = useState([]);
  const [loader, setloader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAppointment();
  }, []);

  async function getAppointment() {
    try {
       setloader(true)
      const res = await axios.get('https://carenest-serverside.vercel.app/appointments/orders', {
        headers: {
          Authorization: `${gettoken}`
        }
      });
      console.log(res)
      setloader(false)
      setAppointments(res.data.data); 
    } catch (err) {
      setloader(false)
      setError("Oops! Something went wrong. Please try again later.");
      console.error("Error fetching appointments", err);
    }
    console.log(appointments.length)
  }
  
const CancelOrder = async (id) => {
    try {
      const res = await axios.patch(
        `https://carenest-serverside.vercel.app/appointments/canceled/${id}`,
        {},
        {
          headers: {
            Authorization: `${gettoken}`
          }
        }
      );
      console.log(res)
  
      getAppointment();
  
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
    }
  };
const DeleteOrder = async (id) => {
  try {
    await axios.delete(`https://carenest-serverside.vercel.app/appointments/${id}`, {
      headers: { Authorization: `${gettoken}` }
    });
  

 
    setDeletedIds(prev => [...prev, id]);

   
    setTimeout(() => {
      setAppointments(prev => prev.filter(app => app._id !== id));
      setDeletedIds(prev => prev.filter(delId => delId !== id));
    }, 500); 

  } catch (err) {
    console.error("Failed to delete appointment:", err);
  }
};

  


const filteredAppointments = appointments.filter(app => {
  if (options === "All") return true;
  return app.status === options;
});

return (
  <div>
    <Mainnavbar />
    <div className='appointment'>
      <h3>My Appointment</h3>
      <div className="option">
        <h2 onClick={() => setOptions("All")} className={options === "All" ? "active" : ""}>All</h2>
        <h2 onClick={() => setOptions("Pending")} className={options === "Pending" ? "active" : ""}>Pending</h2>
        <h2 onClick={() => setOptions("Finished")} className={options === "Finished" ? "active" : ""}>Finished</h2>  
        <h2 onClick={() => setOptions("Canceled")} className={options === "Canceled" ? "active" : ""}>Canceled</h2>  
      </div>

<div className="appointments-list">
  {loader ? (
    <>
      <div className='appointment-card-load'></div>
      <div className='appointment-card-load'></div>
      <div className='appointment-card-load'></div>
    </>
  ) : error ? (
    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
  ) : filteredAppointments.length > 0 ? (
    filteredAppointments.map((app) => (
      <div
        key={app._id}
        className={`appointment-card ${deletedIds.includes(app._id) ? 'fade-out' : ''}`}
      >
        <p><strong>Day:</strong> {app.day.type}</p>
        <p><strong>Date:</strong> {new Date(app.day.date).toLocaleDateString()}</p>
        <p><strong>Timing:</strong> {app.day.time.startTime}</p>
        <p><strong>Price:</strong> {app.orderPrice} $</p>
        <p><strong>Status:</strong> {app.status}</p>

        {(app.status === "Canceled" || app.status === "Finished") ? (
          <div className="btn-appoint">
            <button className="delete-btn" onClick={() => DeleteOrder(app._id)}>delete</button>
          </div>
        ) : (
          <div className="btn-appoint">
            <button className="delete-btn" onClick={() => DeleteOrder(app._id)}>delete</button>
            <button className="cancel-btn" onClick={() => CancelOrder(app._id)}>Cancel</button>
          </div>
        )}
      </div>
    ))
  ) : (
    <p style={{ color: '#777', textTransform: "capitalize" }}>
      There are no appointments currently.
    </p>
  )}
</div>


    </div>
  </div>
);

}
