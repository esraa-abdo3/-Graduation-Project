
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { BabyContext } from "../../context/BabyContext";
import Cookies from "universal-cookie";
import axios from "axios";

// تسجيل المكونات المطلوبة
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = ({weightactive , heightactive}) => {
  const { activegender, activeBaby } = useContext(BabyContext);
  const cookies = new Cookies();
  const getToken = cookies.get("Bearer");
  const idbaby = cookies.get("activebaby");
  const [heights, setHeights] = useState([]);
  const [weights, setWeights] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  console.log(weightactive);
  console.log(heightactive)


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    // تنظيف الحدث عند إلغاء تركيب المكوّن
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const res = await axios.get(`https://carenest-serverside.vercel.app/babies/${idbaby}`, {
          headers: { Authorization: ` ${getToken}` },
        });

        const babyData = res.data?.data || {};
        const babyHeights = babyData.height || [];
        const babyWeights = babyData.weight || [];

        const validHeights = babyHeights
          .filter((entry) => entry?.height !== null && entry?.ageCategory !== null)
          .map((entry) => ({ 
            value: entry.height, 
            month: `Month ${parseInt(entry.ageCategory.replace("month_", ""), 10)}` 
          }));

        const validWeights = babyWeights
          .filter((entry) => entry?.weight !== null && entry?.ageCategory !== null)
          .map((entry) => ({
            value: entry.weight,
            month: `Month ${parseInt(entry.ageCategory.replace("month_", ""), 10)}`
          }));

        setHeights(validHeights);
        setWeights(validWeights);
      } catch (error) {
        console.error("❌ Error fetching babies:", error);
      }
    };

    fetchBabies();
  }, [getToken, idbaby]);
  const femaleWeightData = [4, 4.95, 6.3, 6.1, 6.7, 7.35, 7.6, 8.4, 8.85, 9.3, 9.5, 9.65, 12.25];
  const femaleHeightData = [53, 57, 59, 61, 63.5, 65, 67, 68, 69.5, 71.5, 72.5, 74.5, 85];
  const maleWeightData = [3.7, 5.25, 6.05, 6.65, 7.5, 8.0, 8.6, 9.05, 9.25, 10, 10.3, 10.55, 13];
const maleHeightData = [54.5, 58, 61, 64, 65.5, 67, 69.5, 70.5, 71, 73, 75, 75.1, 86];



  const months = [
    "Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6",
    "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12", "Year 2"
  ];

  const firstRecordedMonth = heights.length > 0 ? heights[0].month : "Month 1";
  const startIndex = months.indexOf(firstRecordedMonth);

  const slicedMonths = months.slice(startIndex);
  const slicedMaleHeightData = maleHeightData.slice(startIndex);
  const slicedFemaleHeightData = femaleHeightData.slice(startIndex);
  const slicedMaleWeightData = maleWeightData.slice(startIndex);
  const slicedFemaleWeightData = femaleWeightData.slice(startIndex);
  const yAxisOptions = weightactive
  ? { min: 1, max: 15 }
  : heightactive
    ? { min: 20, max: 90 }
    : { min: 0, max: 90 };


  const data = {
    labels: slicedMonths,
    datasets: [
      ...(weightactive || !weightactive && !heightactive
        ? [
            {
              label: activegender === "Male" ? "Standard Male Weight (kg)" : "Standard Female Weight (kg)",
              data: activegender === "Male" ? slicedMaleWeightData : slicedFemaleWeightData,
              borderColor: "rgb(192, 192, 75)",
              backgroundColor: "rgba(192, 192, 75, 0.27)",
              borderWidth: 2,
              tension: 0.2,
              fill: false,
              pointRadius: 0,
              borderDash: [5, 5],
            },
            {
              label: `Recorded ${activeBaby} Weight`,
              data: weights.map((entry) => entry.value),
              borderColor: "green",
              borderWidth: 2,
              tension: 0.2,
              fill: false,
            }
          ]
        : []),
      ...(heightactive || !weightactive && !heightactive
        ? [
            {
              label: activegender === "Male" ? "Standard Male Height (cm)" : "Standard Female Height (cm)",
              data: activegender === "Male" ? slicedMaleHeightData : slicedFemaleHeightData,
            // borderColor: "green",
            borderColor: "#4bc0c0",
            backgroundColor: "rgba(99, 221, 255, 0.99)",
              borderWidth: 2,
              tension: 0.2,
              fill: false,
              pointRadius: 0,
              borderDash: [5, 5],
            },
            {
              label: `Recorded ${activeBaby} Height`,
              data: heights.map((entry) => entry.value),
              borderColor:"rgb(192, 75, 112)",
              backgroundColor:"rgba(192, 75, 112, 0.33)",
              borderWidth: 2,
              tension: 0.2,
              fill: false,
            }
          ]
        : [])
    ]
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: !isMobile,
 
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Growth Rate of your baby", 
      },
      tooltip: {
        enabled: true, 
        mode: "nearest",
        intersect: false,
      },
    },
    scales: {
      y:yAxisOptions
    },
  };

  return (
    <div  className="contain-line">
      <Line   data={data} options={options}  />
    </div>
  );
};

export default LineChartComponent;

