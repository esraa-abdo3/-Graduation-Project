import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import boy from "../../../assets/baby-boy 1.svg";
import girl from "../../../assets/baby.svg";
import { PiRulerLight } from "react-icons/pi";
import { GiWeightScale } from "react-icons/gi";
import { IoAlarmOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import Addbaby from "../NameBaby/NameBaby";
import Babydetails from "../my babies/updatebaby";

export default function Maybabies() {
  const cookie = new Cookies();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const gettoken = cookie.get("Bearer");
  const [allbabies, setallbabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [length, setlength] = useState([]);
  const [add, setadd] = useState(false);
  const [update, setupdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  function displayValue(value) {
    return value === null || value === undefined || value === "" ? "غير متاح" : value;
  }

  async function handledelete(id) {
    try {
      await axios.delete(`https://carenest-serverside.vercel.app/babies/${id}`, {
        headers: {
          Authorization: `${gettoken}`,
        },
      });

      if (cookie.get("activebaby") === id) {
        const remainingBabies = allbabies.filter((baby) => baby._id !== id);
        if (remainingBabies.length > 0) {
          const newActiveBaby = remainingBabies[remainingBabies.length - 1]._id;
          cookie.set("activebaby", newActiveBaby);
        }
      }

      setallbabies((prevBabies) => prevBabies.filter((baby) => baby._id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchBabiesAndVaccines() {
      try {
        const response = await axios.get(
          "https://carenest-serverside.vercel.app/babies/allBabiesOfLoggedUser",
          {
            headers: {
              Authorization: `${gettoken}`,
            },
          }
        );

        const babiesData = response.data.data;
        const vaccinesPromises = babiesData.map((baby) => getallvaccines(baby._id));
        const vaccinesResults = await Promise.all(vaccinesPromises);

        setlength(vaccinesResults);
        setallbabies(babiesData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching babies or vaccines:", error);
        setLoading(false);
      }
    }

    if (gettoken) {
      fetchBabiesAndVaccines();
    }
  }, [gettoken]);

  async function getallvaccines(activeBabyId) {
    if (!activeBabyId) {
      return null;
    }
    try {
      let res = await axios.get(
        `https://carenest-serverside.vercel.app/babies/medicationSchedule/all/${activeBabyId}`,
        {
          headers: {
            Authorization: `${gettoken}`,
          },
        }
      );

      return res.data.data;
    } catch (err) {
      console.log("Error in getallvaccines:", err);
      return null;
    }
  }

  function calculateAge(birthDateString) {
    if (!birthDateString) {
      return { years: "NA", months: "NA", days: "NA" };
    }

    const birthDate = new Date(birthDateString);
    const today = new Date();

    let ageInYears = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      ageInYears--;
    }

    let ageInMonths = monthDifference;
    if (monthDifference < 0) {
      ageInMonths += 12;
    }

    const timeDifference = today.getTime() - birthDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const remainingDays = daysDifference % 30;

    return {
      years: ageInYears,
      months: ageInMonths,
      days: remainingDays,
    };
  }

  const babyCardsGrouped =
    allbabies.length > 2
      ? allbabies.reduce((acc, baby, index) => {
          if (index % 2 === 0) {
            acc.push([baby]);
          } else {
            acc[acc.length - 1].push(baby);
          }
          return acc;
        }, [])
      : [allbabies];

  let currentIndex = 0;

  const slides = babyCardsGrouped.map((group, index) => (
    <div key={index} className="slide">
      {group.map((e, idx) => {
        const age = calculateAge(e.birthDay);
        const textColor = e.gender === "Female" ? "#F488B8" : "#0A6AA6";
        const reminders = length && length[currentIndex] ? length[currentIndex] : [];
        currentIndex++;

        const latestHeight = e.height?.filter((item) => item.height !== null).pop();
        const latestWeight = e.weight?.filter((item) => item.weight !== null).pop();

        return (
          <div key={idx} className="babycard" style={{ color: textColor }}>
            <div className="basic-info">
              <div className="names">
                <img src={e.gender === "Female" ? girl : boy} alt="gender-specific" />
                <h5 style={{ color: textColor }}>{displayValue(e.name)}</h5>
              </div>
              <div className="age" style={{ color: "black", paddingLeft: "10px" }}>
                {age.years === 0 ? "" : `${age.years} years , `}
                {age.months === 0 ? " " : `${age.months} months, `}
                {age.days} Days
              </div>
            </div>
            <div className="num-of-reminders">
              <div className="icon">
                <IoAlarmOutline style={{ color: textColor }} />
              </div>
              <div style={{ color: "black", fontFamily: "Fredoka", fontWeight: "500" }}>
                {reminders.length}
              </div>
              <div className="remind" style={{ color: "#777", fontWeight: "500", fontFamily: "Fredoka" }}>
                reminders
              </div>
            </div>
            <div className="measuerments">
              <div className="weight">
                <div className="icon">
                  <GiWeightScale style={{ color: textColor }} />
                </div>
                <div className="kg" style={{ color: "black" }}>
                  {latestWeight && latestWeight.weight != null ? `${latestWeight.weight} kg` : "N/A"}
                </div>
                <div className="weight" style={{ color: "#777" }}>weight</div>
              </div>
              <div className="height">
                <div className="icon">
                  <PiRulerLight style={{ color: textColor }} />
                </div>
                <div className="cm" style={{ color: "black" }}>
                  {latestHeight && latestHeight.height != null ? `${latestHeight.height} cm` : "N/A"}
                </div>
                <div className="weight" style={{ color: "#777" }}>height</div>
              </div>
            </div>
            <div className="baby-options">
              <button className="lab" style={{ color: textColor, borderColor: textColor }}
                onClick={() => { setupdate(true); setUpdateId(e._id); }}>
                update
              </button>
              <button className="lab" style={{ color: textColor, borderColor: textColor }} onClick={() => handledelete(e._id)}>
                delete
              </button>
              <button className="media-responseve" onClick={() => { setupdate(true); setUpdateId(e._id); }}>
                <CiEdit style={{ color: textColor, borderColor: textColor }} />
              </button>
              <button className="media-responseve" onClick={() => handledelete(e._id)}>
                <TiDelete style={{ color: textColor, borderColor: textColor }} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className="babies-slider">
      <div className="text">
        <h3>My Babies</h3>
        <button onClick={() => setadd(true)}>
          <span style={{ paddingRight: "10px" }}>+</span>
          Add Baby
        </button>
      </div>
      {loading ? (
        <>
          <div className="babyslide"></div>
          <div className="babyslide"></div>
        </>
      ) : allbabies.length !== 0 ? (
        <Slider {...settings}>{slides}</Slider>
      ) : (
        <p className="no-babies">No babies added yet</p>
      )}
      {add && <Addbaby close={() => setadd(false)} add={add} />}
      {update && updateId && <Babydetails close={() => { setupdate(false); setUpdateId(null); }} idbaby={updateId} />}
    </div>
  );
}
