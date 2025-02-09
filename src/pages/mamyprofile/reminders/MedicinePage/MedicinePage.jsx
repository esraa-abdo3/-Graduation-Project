
import { useContext, useEffect, useState } from 'react';
import './MedicinePage.css';
import medicineImg from "../../../../assets/babymedicine.png";
import Calendar from './Calendar';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../../../../Componets/Navbar/Navbar.css"



import { TiDeleteOutline } from "react-icons/ti";
import { IoAlarmOutline } from "react-icons/io5";
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar"
import Features from "../../Mainhome/Features";
import { BabyContext } from '../..//../../context/BabyContext';

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});
  const [msg, setMsg] = useState("");
  const [warningDel, setWarningDel] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const[loadingdelete,setloadinelete]=useState(false)
  const { activeBabyId } = useContext(BabyContext);
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');
  const idbaby = cookie.get("activebaby");
  console.log('idBaby:',idbaby);
  


  
  const Navigate = useNavigate();
  const addBaby = () => {
    Navigate('/addmedicine');
  };

  const checked = (index) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDeleteDialog = (index) => {
    setWarningDel({
      index: index,
      message: `Are you sure you want to delete "${medicines[index].medicationName}"?`,
    });

    setShowDialog(true);
  };

  const cancelDelete = () => {
    setShowDialog(false); 
    setWarningDel({});
  };

  const confirmDelete = async (index) => {
    setloadinelete(true)
    const medicationId = medicines[index].id;

    try {
      const res = await axios.delete(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/${activeBabyId}/${medicationId}`,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      setloadinelete(false)
      setShowDialog(false)
      

      if (res.data && Array.isArray(res.data.medicationSchedule)) {
        setMedicines(res.data.medicationSchedule);
        if (res.data.medicationSchedule.length === 0) {
          setMsg("No Reminders Added for you Yet");
        }
      } else {
        setMedicines([]);
        setMsg("No Reminders Added for you Yet");
      }
      setWarningDel({});
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        setError("No medication schedule found with the specified name.");
      } else if (err.response && err.response.status === 401) {
        setError("You are not authorized to delete this medication.");
      } else {
        setError("An error occurred while deleting the medication.");
      }
      setWarningDel({});
    } finally {
      setloadinelete(false)
    }
  };

  const getAllMesdicineAllBabys = async () => {
    try {
      const res = await axios.get(
        'https://carenest-serverside.vercel.app/babies/medicationSchedule/allBabiesMedications',
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      return res.data.data;
    } catch (err) {
      console.error("Error fetching all medicines for all babies:", err);
      throw err;
    }
  };

 
  const getAllMedicines = async () => {
    if (!activeBabyId) {
      setMsg("No baby selected or no reminders found.");
      setMedicines([]);
      setLoading(false);
      return;
    }

  
    try {
      let resData;
    if (activeBabyId === "all") {
        resData = await getAllMesdicineAllBabys();
   }
      const res = await axios.get(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/all/${activeBabyId}`,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
  
       resData = res.data.data;
      console.log(res);
  
      if (Array.isArray(resData)) {
        setMedicines(resData);
        setMsg(resData.length === 0 ? "No Reminders Added for you Yet" : "");
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMsg("No medication schedule found for this baby.");
          setMedicines([]);
        } else if (error.response.status === 403) {
          setError("You are not authorized to access this baby’s schedule.");
        } else {
          setError("An error occurred");
        }
      } else {
        setError("Network error or no response from server.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  useEffect(() => {
    if (!activeBabyId) {
      setMedicines([]);
      setMsg("No baby selected or no reminders found.");
    } else {
      setMedicines([]);
      setMsg("");
      setError(null);
      getAllMedicines();
    }
  }, [activeBabyId]);

  function handleNavigation(scheduleId) {
    Navigate(`/medicine/${scheduleId}`);
  }


  return (
    <div>
           <Mainnavbar/>
           <Features/>
      <div className="medicine-page-container">
        <div className="title-reminder">
          <h2>My Reminders</h2>
          <div className="content" onClick={addBaby}>+</div>
       
     
        </div>
        <Calendar />
        <h3>Today</h3>
      
      

        {error && <h3 className="msg-error">{error}</h3>}

        {loading ? (
          <div className='selection-medicine'>
            <div className='selection-med'>
            
            </div>
            <div className='selection-med'>
           
            </div>
          </div>
        ) : (
          medicines.length > 0 ? (
            <ul className='medicine-list'>
              {medicines.map((medicine, index) => (
                <li key={index} onClick={() => handleNavigation(medicine._id)}>
                  <img src={medicineImg} alt="img" />
                  <div>
                    <h4>{medicine.medicationName}</h4>
                    <div>
                    <IoAlarmOutline style={{color:"#777777",fontSize:"23px" , marginTop:"-5px" , marginRight:"7px"}}/>
                      <p className="time">{medicine.time}</p>
                    </div>
                  </div>
                  <div className="del-check-box">
              
                      < TiDeleteOutline
                        className="deleteicon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteDialog(index);
                        }}
                      
                      
                      />
                  
                    <span
                      className={`material-icons check ${checkedStates[index] ? 'checked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        checked(index);
                      }}
                    >
                      check_circle
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h3 className="msg-noadd">{msg}</h3>
          )
        )}

{showDialog && (
         <div className="confirmation-dialog show">
            <p>{warningDel.message}</p>
             <div>
               <button onClick={() => confirmDelete(warningDel.index)} className='delyes'>
                 {loadingdelete? <div className="spinner-small"></div> : "Yes"}
               </button>
               <button onClick={cancelDelete} className='delno'>No</button>
             </div>
           </div>
         )}
      </div>
    </div>
  );
}
