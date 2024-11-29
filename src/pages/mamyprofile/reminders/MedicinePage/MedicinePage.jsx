import React, { useEffect, useState } from 'react';
import './MedicinePage.css';
import ProfileNav from '../../../../Componets/profilenav/ProfileNav';
import medicineImg from "../../../../assets/babymedicine.png";
import Calendar from './Calendar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

export default function MedicinePage() {
  const [medicines, setMedicines] = useState([]);
  const [error, setError] = useState(null);
  const [checkedStates, setCheckedStates] = useState({});
  const [msg, setMsg] = useState("");
  const [warningDel, setWarningDel] = useState({});
  const cookie = new Cookies();
  const gettoken = cookie.get('Bearer');
  const idbaby = cookie.get('activebaby');
  console.log('id===>',idbaby)

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

  const [showDialog, setShowDialog] = useState(false);

const handledelete = (index, medicationName) => {
  setWarningDel({
    index: index,
    message: `Are you sure you want to delete "${medicationName}"?`,
  });
  setShowDialog(true); 
};

const cancelDelete = () => {
  setShowDialog(false); 
  setWarningDel({});
};


  const confirmDelete = async (index) => {
    const medicationName = medicines[index].medicationName;

    try {
        const res = await axios.delete(
            `https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}`,
            {
                headers: {
                    Authorization: `${gettoken}`,
                },
                data: { medicationName },
            }
        );

        const updatedMedicines = medicines.filter((_, i) => i !== index);
        setMedicines(updatedMedicines);
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
    }
  };

  

  const getAllMedicines = async () => {
    try {
      const res = await axios.get(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/all/${idbaby}`,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      if (Array.isArray(res.data.data)) {
        setMedicines(res.data.data);
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
    getAllMedicines();
  },[idbaby]);
  

  return (
    <div>
      <ProfileNav />
      <div className="medicine-page-container">
        <div className="title-reminder">
          <h2>My Reminders</h2>
          <div className="content" onClick={addBaby}>+</div>
        </div>
        <Calendar />
        <h3>Today</h3>

        {error && <h3 className="msg-error">{error}</h3>}

        {medicines.length === 0 && !error ? (
          <h3 className="msg-noadd">{msg}</h3>
        ) : (
          <ul className="medicine-list">
            {medicines.map((medicine, index) => (
              <li key={index}>
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
                    onClick={() => handledelete(index, medicine.medicationName)}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    version="1.2"
                    baseProfile="tiny"
                    viewBox="0 0 24 24"
                    className="deleteicon"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z"></path>
                  </svg>
                  <span
                    className={`material-icons check ${checkedStates[index] ? 'checked' : ''}`}
                    onClick={() => checked(index)}
                  >
                    check_circle
                  </span>
                </div>

                {warningDel.index === index && (
  <div className={`confirmation-dialog ${showDialog ? "show" : ""}`}>
    <p>{warningDel.message}</p>
    <div>
      <button onClick={() => confirmDelete(index)}>Yes</button>
      <button onClick={() => cancelDelete()}>No</button>
    </div>
  </div>
)}


              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
