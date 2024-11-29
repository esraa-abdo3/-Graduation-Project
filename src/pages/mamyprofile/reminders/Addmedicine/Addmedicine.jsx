
import { useState } from "react";
import ProfileNav from "../../../../Componets/profilenav/ProfileNav";
import babymedicine from "../../../../assets/babymedicine.png";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Addmedicine.css";
import axios from "axios";

export default function AddMedicine() {
  const [Medicine, setMedicine] = useState({
    medicationName: "",
    time: "",
    begin: "",
    end: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [success, setSuccess] = useState("");
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicine({ ...Medicine, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setSuccess("");

    const cookie = new Cookies();
    const gettoken = cookie.get("Bearer");
    const idbaby = cookie.get("activebaby");

    try {
      const res = await axios.post(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/${idbaby}`,
        Medicine,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );
      console.log(res);
      setSuccess("Medicine Added successfully!");

      Navigate("/myprofile/MedicinePage");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        const formattedErrors = {};
        errors.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });
        setFieldErrors(formattedErrors);
      } else {
        console.error("Error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProfileNav />
      <div className="Addbaby addmedicine">
        <div className="NameBabyTitle medicine-img">
          <div className="img">
            <img src={babymedicine} alt="img" />
          </div>
        </div>
        <p style={{ textAlign: "center" }}>Add Medicine</p>
        <div className="medicine-form">
          <form className="name-baby-form medicine-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="medicationName"
              value={Medicine.medicationName}
              onChange={handleChange}
              placeholder="Medicine Name"
              required
            />
            {fieldErrors.medicationName && (
              <span style={{ color: "red" }}>{fieldErrors.medicationName}</span>
            )}

            <input
              type="time"
              name="time"
              value={Medicine.time}
              onChange={handleChange}
              placeholder="When To Take"
              required
            />
            {fieldErrors.time && (
              <span style={{ color: "red" }}>{fieldErrors.time}</span>
            )}

            <div className="date">
              <input
                type="date"
                name="begin"
                value={Medicine.begin}
                onChange={handleChange}
                placeholder="Start"
                required
              />

              <input
                type="date"
                name="end"
                value={Medicine.end}
                onChange={handleChange}
                placeholder="Finish"
                required
              />
            </div>
            {fieldErrors.begin && (
              <span style={{ color: "red" }}>{fieldErrors.begin}</span>
            )}
            {fieldErrors.end && (
              <span style={{ color: "red" }}>{fieldErrors.end}</span>
            )}

            <button
              type="submit"
              className="submit-button save-reminders"
              disabled={loading}
            >
              {loading ? <div className="spinner-small"></div> : "Make Reminder"}
            </button>
          </form>
          {success && <span style={{ color: "green" }}>{success}</span>}
        </div>
      </div>
    </div>
  );
}
