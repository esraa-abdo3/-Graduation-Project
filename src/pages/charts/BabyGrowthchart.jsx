// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // تسجيل المكونات المطلوبة
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const LineChartComponent = () => {
//   // الأشهر بالاختصارات
//   const monthsShort = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   // البيانات
//   const data = {
//     labels: monthsShort, // استخدام الاختصارات كـ labels
//     datasets: [
//       {
//         label: "Sales 2023",
//         data: [100, 200, 150, 300, 250, 400, 320, 380, 420, 500, 470, 520],
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderWidth: 2,
//         pointRadius: 5,
//         pointBackgroundColor: "rgba(75, 192, 192, 1)",
//         tension: 0,
//       },
//       {
//         label: "Sales 2024",
//         data: [120, 250, 180, 350, 270, 450, 360, 410, 460, 540, 500, 560],
//         borderColor: "rgba(255, 99, 132, 1)",
//         backgroundColor: "rgba(255, 99, 132, 0.2)",
//         borderWidth: 2,
//         pointRadius: 5,
//         pointBackgroundColor: "rgba(255, 99, 132, 1)",
//         tension: 0,
//       },
//     ],
//   };

//   // إعدادات الشارت
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: true, position: "top" },
//       title: { display: true, text: "Monthly Sales Statistics" },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default LineChartComponent;


import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// تسجيل المكونات المطلوبة
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const LineChartComponent = () => {
  // البيانات الخاصة بالوزن الطبيعي للذكور
  const maleWeightData = [
    3.6, 4.6, 5.6, 6.6, 7.5, 8, 8.6, 9.1, 9.4, 10.4, 10.6, 10.9
  ];

  // البيانات الخاصة بالوزن الطبيعي للإناث
  const femaleWeightData = [
    4, 4.9, 5.7, 6.1, 6.4, 6.8, 7.1, 7.6, 7.9, 8.4, 8.5, 8.9
  ];

  // أشهر السنة (1-12) أو حسب الحاجة (في حالة إضافة المزيد من الأعمار)
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // إعدادات البيانات لرسم الخطوط
  const data = {
    labels: months, // الأشهر
    datasets: [
      {
        label: "Male Growth Rate", // معدل نمو الذكور
        data: maleWeightData, // بيانات الوزن للذكور
        borderColor: "rgba(75, 192, 192, 1)", // اللون
        backgroundColor: "rgba(75, 192, 192, 0.2)", // اللون خلف الخط
        borderWidth: 2, // سمك الخط
        tension: 0.2, // انحناء الخط
        fill: false, // عدم ملء المساحة تحت الخط
            pointRadius: 0, // إزالة النقاط
            borderDash: [5, 5], // جعل الخطوط منقطة (مصفوفة الأرقام تحدد طول الخطوط والفجوات)
      },
      {
        label: "Female Growth Rate", // معدل نمو الإناث
        data: femaleWeightData, // بيانات الوزن للإناث
        borderColor: "rgba(255, 99, 132, 1)", // اللون
        backgroundColor: "rgba(255, 99, 132, 0.2)", // اللون خلف الخط
        borderWidth: 2, // سمك الخط
        tension: 0.2, // انحناء الخط
        fill: false, // عدم ملء المساحة تحت الخط
          pointRadius: 0, // إزالة النقاط
          borderDash: [5, 5], // جعل الخطوط منقطة (مصفوفة الأرقام تحدد طول الخطوط والفجوات)
      },
    ],
  };

  // إعدادات الشارت
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Growth Rate of Babies (Male vs Female)", // عنوان الشارت
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
