
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import PropTypes from "prop-types";
import "./Chartcry.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#4F8FFB",
  "#F488B8",
  "#FFB347",
  "#7ED957",
  "#A259FF",
  "#F24E1E",
];

export default function Chartcry({ cries }) {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [cries]);

  const classCounts = cries.reduce((acc, cry) => {
    acc[cry.class] = (acc[cry.class] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(classCounts);
  const dataCounts = Object.values(classCounts);
  const total = dataCounts.reduce((a, b) => a + b, 0);
  const percentages = dataCounts.map((count) => ((count / total) * 100).toFixed(1));

  const data = {
    labels,
    datasets: [
      {
        data: dataCounts,
        backgroundColor: COLORS,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const percent = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percent}%)`;
          },
        },
      },
    },
    cutout: "65%",
  };

  return (
    <div className="cry-doughnut-chart" style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <h3 style={{
        textAlign: "center",
        color: "#0A6AA6",
        fontFamily: "Fredoka",
        marginBottom: 8,
        fontWeight: "500"
      }}>
        Baby Cry Types Statistics
      </h3>

      {loading ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : cries.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "20px",
          color: "#999",
          fontFamily: "Fredoka",
          fontSize: "16px"
        }}>
          No data available
        </div>
      ) : (
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Doughnut data={data} options={options} style={{ maxWidth: 150, maxHeight: 150 }} />
          <div className="cry-legend-list" style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
            {labels.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Fredoka" }}>
                <span style={{
                  display: "inline-block",
                  width: 22,
                  height: 10,
                  borderRadius: 4,
                  background: COLORS[i % COLORS.length],
                  marginInlineEnd: 8,
                  border: "2px solid #fff",
                  boxShadow: "0 0 2px #bbb"
                }} />
                <span style={{ fontWeight: "500", color: COLORS[i % COLORS.length] }}>{label}</span>
                <span style={{ color: "#777", marginInlineStart: 8 }}>{percentages[i]}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Chartcry.propTypes = {
  cries: PropTypes.array.isRequired,
};
