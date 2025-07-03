import { useContext, useEffect, useState } from 'react';
import './MedicinePage.css';
import medicineImg from "../../../../assets/babymedicine.webp";
import Calendar from './Calendar';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import "../../../../Componets/Navbar/Navbar.css"
import { TiDeleteOutline } from "react-icons/ti";
import Mainnavbar from "../../../../Componets/mainhomeprofile/Mainnavbar"
import { BabyContext } from '../..//../../context/BabyContext';
import AddMedicine from '../Addmedicine/Addmedicine';
import { IoAlarm } from "react-icons/io5";
import Updatemedicine from '../Addmedicine/Updatemedicine';

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
  const [add, setadd] = useState(false);
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');
  const idbaby = cookie.get("activebaby");
  console.log('idBaby:', idbaby);
  const [update, setupdate] = useState(false);
  
  const Navigate = useNavigate();
  const [deletingIndex, setDeletingIndex] = useState(null);
const[Reminderid,setreminderid]=useState("")

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

  const close =()=>{
    setadd(false)
    setupdate(false)
    setreminderid("")
  }

  const confirmDelete = async (index) => {
    setDeletingIndex(index);
    setloadinelete(true);
    setShowDialog(false);
    setTimeout(async () => {
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
        setloadinelete(false);
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
        setloadinelete(false);
        setDeletingIndex(null);
      }
    }, 500);
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
          setMsg("No medication schedule found for this baby. Add now");
          setMedicines([]);
        } else if (error.response.status === 403) {
          setError("You are not authorized to access this baby's schedule.");
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




  return (
    <div >
           <Mainnavbar/>
           {/* <Features/> */}
      <div className="medicine-page-container">
        <div className="title-reminder">
          <h2>My Reminders</h2>
          <div className="content" onClick={() => setadd(true)}>
            <span>
+
            </span>
            </div>
       
     
        </div>
        <Calendar />
        {/* <h3>Today</h3> */}
      
      

        {error && <h3 className="msg-error">{error}</h3>}

        {loading ? (
          <div className='selection-medicine' >
            <div className='selection-med'>
            
            </div>
            <div className='selection-med'>
           
            </div>
          </div>
        ) : (
          medicines.length > 0 ? (
            <ul className='medicine-list'>
              {medicines.map((medicine, index) => (
                <li key={index} onClick={() => {
  setupdate(true);
  setreminderid(medicine._id);
}}
                  className={deletingIndex === index ? 'fade-out-medicine' : ''}
                >
                  <img src={medicineImg} alt="img" />
                  <div>
                    <h4>{medicine.medicationName}</h4>
                    <div>
                    <IoAlarm  style={{color:"#777",fontSize:"23px"  , marginRight:"7px"}}/>
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
      {add && (
        <AddMedicine close={close} getallreminders={getAllMedicines } />
      )}
      {
        update && (
          <Updatemedicine close={close} getallreminders={getAllMedicines} id={ Reminderid} />
        )
      }
      {/* <div style={{height:"50px" , marginTop:"50px"}}></div> */}
    </div>
  );
}
