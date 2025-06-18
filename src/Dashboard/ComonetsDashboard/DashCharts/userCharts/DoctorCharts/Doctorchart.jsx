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
  Filler,
} from "chart.js";
import { useEffect, useState, useRef } from "react";

import axios from "axios";
import Cookies from "universal-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler 
);

export default function AppointmentsAreaChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null); 
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    async function getPayments(id) {
      try {
        const res = await axios.get(
          `https://carenest-serverside.vercel.app/appointments/monthly-growth?doctorId${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(res.data)

   const monthsNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


        const fullData = new Array(12).fill(0);

        res.data.data.forEach(item => {
          fullData[item.month - 1] = item.count;
        });

     
        const ctx = chartRef.current?.ctx;
        let gradient = null;
        if (ctx) {
          gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(10, 106, 166, 0.4)");
          gradient.addColorStop(1, "rgba(10, 106, 166, 0.05)");
        }

        setChartData({
          labels: monthsNames,
          datasets: [
            {
              label: "Appointments Monthly-Growth",
              data: fullData,
              fill: true,
              backgroundColor: gradient || "rgba(10, 106, 166, 0.2)",
              borderColor: "#0A6AA6",
              borderWidth: 2,
              tension: 0.4,
              pointBackgroundColor: "#0A6AA6",
              pointBorderColor: "white",
            },
          ],
        });

      } catch (error) {
        console.log(error);
      }
    }

    getPayments();
  }, [token]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        fill: true, 
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { padding: 10 },
      },
      y: {
        grid: {
          display: true,
          color: "#EEE",
        },
        ticks: {
          stepSize: 1,
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ height: "250px", width: "100%", background: "#fff", borderRadius: "12px", padding: "30px 15px"  }}>
 <h3 style={{ marginBottom: "10px", fontSize: "16px", color: "#0A6AA6" }}>Appointments Over Time</h3>
      {chartData.labels.length > 0 ? (
        <Line ref={chartRef} data={chartData} options={options} />
      ) : (
                         <section className="dots-container">
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
  <div className="dot"></div>
</section>
      )}
    </div>
  );
}