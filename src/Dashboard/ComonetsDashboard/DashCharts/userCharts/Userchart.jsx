import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip,Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import "./Userchart.css";
import axios from "axios";
import Cookies from "universal-cookie";

ChartJS.register(CategoryScale,LinearScale,LineElement,PointElement, Title,Tooltip,Legend
);

export default function RandomLineChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const cookie = new Cookies();
  const gettoken = cookie.get("Bearer");
  const [newbabiesnum, setnewbabiesnum] = useState('');
  const [newuserssnum, setnewusersnum] = useState('');
  const [newuserspercent, setnewuserspercent] = useState('');
  const [newbabiespercent, setnewbabiespercent] = useState('');
  

  useEffect(() => {
    async function getstats() {
      try {
        let res = await axios.get('https://carenest-serverside.vercel.app/dashboard/monthly-revenue', {
          headers: {
            Authorization: `${gettoken}`
          }
        });
        console.log(res.data);

        const revenueData = res.data.data;
        const months = revenueData.map(item => item.monthName); 
        const totalMoms = revenueData.map(item => item.totalMoms); 
        const totalBabies = revenueData.map(item => item.totalBabies); 
        const totalMomsSum = totalMoms.reduce((acc, num) => acc + num, 0);
        const totalBabiesSum = totalBabies.reduce((acc, num) => acc + num, 0);
        setnewbabiesnum(totalBabies[totalBabies.length - 1]);
        setnewusersnum(totalMoms[totalMoms.length - 1]);
        if (totalMomsSum > 0) {
          const percentageUsers = (newuserssnum / totalMomsSum) * 100;
          setnewuserspercent(percentageUsers.toFixed(2));
        }

        if (totalBabiesSum > 0) {
          const percentageBabies = (newbabiesnum / totalBabiesSum) * 100;
          setnewbabiespercent(percentageBabies.toFixed(2));
        }
        
       
        setChartData({
          labels: months,
          datasets: [
            {
              label: "Total Moms",
              data: totalMoms,
              fill: false,
              borderWidth: 2,
              borderColor: "#0A6AA6",
              tension: 0.4,
              pointBackgroundColor: "#4F4C9C",
              pointBorderColor: "white",
            },
            {
              label: "Total Babies",
              data: totalBabies,
              fill: false,
              borderWidth: 2,
              borderColor: "#F488B8",
              tension: 0.4,
              pointBackgroundColor: "#4F4C9C",
              pointBorderColor: "white",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
    getstats();
  }, [gettoken]);

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,

  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //       ticks: {
  //         padding: 5, 
  //         display: true,
  //       },
  //     },
  //     y: {
  //       grid: {
  //         display: true,
  //         color: "#EEEEEE",
  //         lineWidth: 1.9,
  //         padding: 5, // المسافة بين التسمية (الـ ticks) والمحور الرأسي (Y)
  //       },
  //       ticks: {
  //         display: true,
  //         stepSize: 1,
  //         padding:5,
  //       },
  //       min: 0,
  //     },
  //   },
  //   plugins: {
  //     legend: { display: true },
  //     tooltip: { enabled: true },
  //     title: { display: true, text: "Monthly Revenue Stats" },
  //   },
  // };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,  
        right: 10, 
        bottom: 30, 
        left: 10, 
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          lineWidth: 1.5, 
        },
        ticks: {
          display: true,
          padding: 10, 
        },
      },
      y: {
        grid: {
          display: true,
          color: "#EEEEEE",
          lineWidth: 1.9,
        },
        ticks: {
          display: true,
          stepSize: 1,
          padding: 10, 
        },
        offset: true,  
        min: 0,
      },
    },
  };
  
  return (
    <div className="lastes">
      <div className="lastesusers">
        <div className="NewUsers">
          <h2>
            New Users 
          </h2>
          <div className="num">

        
            <p>{newuserssnum}</p>
            <div className="precent" style={{ backgroundColor: newuserspercent >= 15 ? " #18AA3330" : "#AA181830", color :newbabiespercent >=15 ?"#3FA70F" :"#A70F33" }}>
              <p className="pre"> +{newuserspercent}  %</p></div>
            </div>
        </div>
        <div className="NewBabies">
          <h2> new Babies</h2>
          <div className="num">
            <p >{newbabiesnum}</p>
            <div className="precent" style={{ backgroundColor: newbabiespercent >= 15 ? " #18AA3330" : "#AA181830" , color :newbabiespercent >=15 ?"#3FA70F" :"#A70F33" } }>
              <p className="pre">+{newbabiespercent} % </p></div>

          </div>
          
</div>
      </div>
      

    <div className="userschart">
      <div className="headers">
        <p>All Users</p>
        <p>Monthly Revenue Comparison</p>
      </div>
      <div style={{ width: "100%", margin: "auto" , height:"200px" }}>
        {chartData && chartData.datasets.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      </div>
      </div>
  );
}


