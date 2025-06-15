
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
import "../../Dashboard/ComonetsDashboard/DashCharts/userCharts/Userchart.css";
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

export default function PaymentAreaChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const chartRef = useRef(null); 
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  useEffect(() => {
    async function getPayments() {
      try {
        const res = await axios.get(
          "https://carenest-serverside.vercel.app/appointments/monthly-growth",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(res.data)

        const monthsNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
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
        ticks: { padding: 5 },
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
      legend: { display: true },
      tooltip: { enabled: true },
    },
  };

  return (
    <div style={{ height: "250px", width: "100%", background: "#fff", borderRadius: "12px", padding: "15px" }}>
      <h3>Payments Over Time</h3>
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
