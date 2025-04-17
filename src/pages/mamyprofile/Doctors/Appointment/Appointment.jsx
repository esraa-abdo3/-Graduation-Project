import React, { useEffect, useState } from 'react';
import './Appointment.css';
import Mainnavbar from '../../../../Componets/mainhomeprofile/Mainnavbar';
import axios from 'axios';
import Cookies from "universal-cookie";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');

  useEffect(() => {
    getAppointment();
  }, []);


  async function getAppointment() {
    try {
      const res = await axios.get('https://carenest-serverside.vercel.app/order/orders', {
        headers: {
          Authorization: `${gettoken}`
        }
      });
      setAppointments(res.data.data); 
    } catch (err) {
      console.error("Error fetching appointments", err);
    }
    console.log(appointments.length)
  }
  
const CancelOrder = async (id) => {
    try {
      const res = await axios.patch(
        `https://carenest-serverside.vercel.app/order/canceled/${id}`,
        {},
        {
          headers: {
            Authorization: `${gettoken}`
          }
        }
      );
  
      getAppointment();
  
    } catch (err) {
      console.error("Failed to cancel appointment:", err);
    }
  };
  

  return (
    <div>
        <Mainnavbar />
        <div className='appointment'>
      <h2>My Appointment</h2>
      <div className="appointments-list">
        {appointments.length > 0 ? (
          appointments.map((app, index) => (
            <div key={app._id} className="appointment-card">
              <p><strong>Day:</strong> {app.day.type}</p>
              <p><strong>Date:</strong> {new Date(app.day.date).toLocaleDateString()}</p>
              <p><strong>Timing:</strong> {app.day.time.startTime}</p>
              <p><strong>Price:</strong> {app.orderPrice} $</p>
              <p><strong>status:</strong> {app.status}</p>
              <div className='btn-appoint'>
                <button onClick={()=> {CancelOrder(app._id)}}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{color:'black'}}>There are no appointments currently.</p>
        )}
      </div>
      </div>
    </div>
  );
}
