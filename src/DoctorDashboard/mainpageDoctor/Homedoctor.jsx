
import Allappointments from "../Allappointments/Allappointments";
import PaymentAreaChart from "../DoctorChart/Doctorchart";
import IncomeChart from "../DoctorChart/IncomeChart";
import "./Homedoctor.css"

import Cookies from "universal-cookie";

export default function Homedoctor() {
      const cookie = new Cookies();
  const doctorFirstName = cookie.get("firstname");
  const doctorlastName = cookie.get("lastname");
  const doctorfullName = doctorFirstName +" " +doctorlastName;
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

    return (
        <div className="Homedoctor">
            <div className="welcome-doc">
                <div className="text">
            <h2> Hello Dr. <span style={{color:"#0A6AA6"}}> { doctorfullName}</span> 👩‍⚕️✨</h2>
                    <p> your patients are counting on you. Let’s make today count !</p>

          </div>
          <div className="tody-date">
               <p className="date-text">{formattedDate}</p>

          </div>
        </div>
        <div className="doctor-chart">
          <PaymentAreaChart />
          <IncomeChart/>

        </div>
        <div className="appoitnemts">
          <Allappointments/>
        </div>

        </div>
    )
}