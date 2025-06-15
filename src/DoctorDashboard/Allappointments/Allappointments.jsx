import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./Allappointments.css"
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
export default function Allappointments() {
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);
  const [allappointments, setallappointments] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const tipsPerPage = 6;
  const totalPages = Math.ceil(allappointments.length / tipsPerPage);
  const indexOfLastTip = currentPage * tipsPerPage;
  const indexOfFirstTip = indexOfLastTip - tipsPerPage;
  const currentappointments = allappointments.slice(indexOfFirstTip, indexOfLastTip);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setloading] = useState(false)
    

    async function getallappointments() {
        setloading(true)
          try {
            let res = await axios.get('https://carenest-serverside.vercel.app/appointments', {
              headers: {
            Authorization: `${gettoken}` 
              }
            })
              setallappointments(res.data.data)
            
              console.log(res.data)
            setloading(false);
            cookie.set("id",res.data.data[0].doctor)
          }
      
    
          catch (error) {
                  setloading(false);
            console.log(error)
          }
          
    }
    async function FinishedAppointment(appointmentId) {

  try {
    let res = await axios.patch(
        `https://carenest-serverside.vercel.app/appointments/finished/${appointmentId}`,
      {},
      {
        headers: {
          Authorization: `${gettoken}`
        }
      }
      );
      

          if (res.status === 200) {
        // تحديث الـ state بدل ما تعملي getAllAppointments تاني
        setallappointments(prev =>
          prev.map(app =>
            app._id === appointmentId
              ? { ...app, isFinished: true }
              : app
          )
        );
      }
  } catch (error) {
       
    console.log(error.response?.data || error);
  }
    }

    const handleSort = () => {
        if (sortOrder === "asc") {
            
            const sorted = [...allappointments].sort((a, b) => new Date(b.appointmentDateTime) - new Date(a.appointmentDateTime));
            setallappointments(sorted);
            setSortOrder("desc");
        } else {
            
            const sorted = [...allappointments].sort((a, b) => new Date(a.appointmentDateTime) - new Date(b.appointmentDateTime));
            setallappointments(sorted);
            setSortOrder("asc");
        }
    };

      useEffect(() => {
 
    getallappointments();
  
      }, [])

        const paginate = (pageNumber) => setCurrentPage(pageNumber);
        const appointments = currentappointments.map((app, index) => (
            <tr key={index} >
                <td>{app.user.firstName}{ app.user.lastName}</td>
                <td>{app.promocode  ? app.promocode : "None"}</td>
                <td>{app.appointmentDateTime.split("T")[0]}</td>
                <td>{app.day.time.startTime}</td>
                <td>{ app.orderPrice}</td>
                <td>{app.status === "Pending" ? <>
                    <div className="appintmentstatus">
              <label>
    <input
      type="checkbox"
      checked={app.isFinished} // لازم يكون عندك قيمة في الـ app تحدد إذا كان انتهى أو لا
      onChange={() => FinishedAppointment(app.id)}
    />
   
  </label>
        
          
                        
                </div>
                </> : app.status === "Finished" ? (
                        <div className="appappintmentfinished" style={{color:"green"}}>
                            Finished
                        </div>

                    ) : app.status === "Cancelled" ? (
                            <div className="appointmentcancel">
  <button className="cancele" disabled >Cancelled</button>
                            </div>
  
  ) : (
    <span>Unknown status</span>
  )}</td>
               
              
            
      
     
    
    
           
            
            </tr>
        ));
        
    return (
        <div className="allappointment">
            <div className="allappintmentsheader">
                <h3> Appointment Activity</h3>
                <p>{ formattedDate}</p>
            </div>

             <table className="styled-table">
                <thead className="gray-header">
                                <tr>
                            <th>mama'Name</th>
                             <th>promocode</th>    
                                 
                        <th style={{ cursor: "pointer" }} onClick={handleSort}>
                              date
                            <span style={{ paddingLeft: "5px" }}>
                                             {sortOrder === "asc" ? <FaSortAmountUpAlt /> : <FaSortAmountDownAlt />}
                                                        </span>
                        
                         
                                    </th>
                        <th> visit time
            
                                    </th>
                        <th>price</th>
                        <th>status</th>
                                 
                            
                                    </tr>
         </thead>
            
                                                             {loading ? (
  <tbody>
    {[...Array(6)].map((_, i) => (
      <tr key={i}>
        <td colSpan="10">
          <div className="tr-loader"></div>
        </td>
      </tr>
    ))}
  </tbody>
) : (
 <tbody>
  {appointments.length > 0 ? (
    appointments
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
        No data found.
      </td>
    </tr>
  )}
</tbody>

)}
                            <tbody>
                                
                            </tbody>
            </table>
              <div >
            {totalPages > 1 && (
    <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
            <button 
                key={index} 
                onClick={() => paginate(index + 1)} 
                className={currentPage === index + 1 ? "active" : ""}

            >
                {index + 1}
            </button>
        ))}
    </div>
)}

        </div>

        </div>
      
         
     )
}