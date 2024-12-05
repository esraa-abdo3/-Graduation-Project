import { useEffect, useState } from 'react';
import './MedicinePage.css';
import ProfileNav from '../../../../Componets/profilenav/ProfileNav';
import medicineImg from "../../../../assets/babymedicine.png";
import Calendar from './Calendar';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NextNavbar from '../../../../Componets/NextNavbar/NextNavbar';

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});
  const [msg, setMsg] = useState("");
  const [warningDel, setWarningDel] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');
  const idbaby = cookie.get('activebaby');
  
  

  const Navigate = useNavigate();
  const addBaby = () => {
    Navigate('/myprofile/Addmedicine');
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
    setLoading(true);
    const medicationId = medicines[index].id;
    console.log('id medi',medicationId)

    try {
        const res = await axios.delete(
            `https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}/${medicationId}`,
            {
                headers: {
                    Authorization: `${gettoken}`,
                }
            }
      );
      

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
      setLoading(false);
      setShowDialog(false);
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
    try {
      let resData;
      if (idbaby === "all") {
        resData = await getAllMesdicineAllBabys();
      } else {
        const res = await axios.get(
          `https://carenest-serverside.vercel.app/babies/medicationSchedule/all/${idbaby}`,
          {
            headers: {
              Authorization: `${gettoken}`,
            },
          }
        );
        resData = res.data.data;
      }
  
      if (Array.isArray(resData)) {
        setMedicines(resData);
        setMsg(resData.length === 0 ? "No Reminders Added for you Yet" : "");
      } else {
        setError("Unexpected response format.");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        if (error.response.data.message === "No medication schedule found") {
          setMsg("No Reminders Added for you Yet");
        } else {
          setError("No baby found with the provided ID or no medication schedule exists.");
        }
      } else if (error.response && error.response.status === 403) {
        setError("You are not authorized to access this baby’s schedule.");
      } else {
        setError("An error occurred");
      }
    }
  };
  

  

  
  useEffect(() => {
    if (!idbaby) {
      setMedicines([]);
      setMsg("No baby selected or no reminders found.");
    } else {
      getAllMedicines();
    }
  
    // const interval = setInterval(() => {
    //   const updatedIdBaby = cookie.get("activebaby");
    //   if (updatedIdBaby !== idbaby) {
    //     window.location.reload();
    //   }
    // }, 1000); 
    // return () => clearInterval(interval); 
  }, [idbaby]);
 
  
  
  

  function handleNavigation(scheduleId) {
    Navigate(`/myprofile/medicine/${scheduleId}`); 
  };
  

  return (
    <div>
      <ProfileNav />
<NextNavbar/>
      <div className="medicine-page-container">
        <div className="title-reminder">
          <h2>My Reminders</h2>
          <div className="content" onClick={addBaby}>+</div>
        </div>
        <Calendar />
        <h3>Today</h3>

        {error && <h3 className="msg-error">{error}</h3>}

        {msg && <h3 className="msg-noadd">{msg}</h3>}

        {medicines.length > 0 && (
        <ul className='medicine-list'>
        {medicines.map((medicine, index) => (
       <li key={index} onClick={() => handleNavigation(medicine._id)}>
        <img src={medicineImg} alt="img" />
        <div>
          <h4>{medicine.medicationName}</h4>
          <div>
            <span className="material-icons">alarm</span>
            <p className="time">{medicine.time}</p>
          </div>
        </div>
        <div className="del-check-box">
          <svg
            className="deleteicon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteDialog(index);
            }}
           
          >
            <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z"></path>
          </svg>
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
)}


        {showDialog && (
          <div className="confirmation-dialog show">
            <p>{warningDel.message}</p>
            <div>
              <button onClick={() => confirmDelete(warningDel.index)} className='delyes'>
                {loading ? <div className="spinner-small"></div> : "Yes"}
              </button>
              <button onClick={cancelDelete} className='delno'>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

