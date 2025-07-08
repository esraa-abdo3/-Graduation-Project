import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import tiredImg from '../../../assets/tiredimg.png'
import bellyImg from '../../../assets/bellyPainImg.png'
import hungryImg from '../../../assets/hungryImg.png'
import discomImg from '../../../assets/discomfortableImg.png'
import burpingImg from '../../../assets/BurbingImg.png'
import maleIcon from '../../../assets/manImg.png'
import femaleIcon from '../../../assets/WomanImg.png'
import './CryListDash.css'
import { BarChart, Bar, Cell,XAxis, YAxis, CartesianGrid, Tooltip,PieChart, Pie, Legend, ResponsiveContainer } from 'recharts';

export default function CryListDash() {
  const [cryOverview , setcryOverview] =useState([]);
  const [genderData , setGenderData] =useState([]);
  const [aveAge ,setAveAge]= useState([]);
  const [satiData ,setSatiData] =useState([]);
  const [dayNightData, setDayNightData] = useState([]);

  const cookie= new Cookies();
  const gettoken = cookie.get('Bearer');
  const COLORS = ["#004c99", "#00bfff"];
  const CRY_CLOCK_COLORS = ["#DC5AB0", "#E68CC7"];
  const CRY_COLORS = ['#E68CC7','#2D9CDB', '#F8961E', '#95A257', '#451F55'];

  
  const cryIcons={
    tired: tiredImg,
    belly_pain : bellyImg,
    discomfort : discomImg,
    hungry : hungryImg,
    burping : burpingImg
  };


  const getDataCry = async()=>{
    try{
      const res = await axios.get('https://carenest-serverside.vercel.app/dashboard/cry-analytics',{
        headers: {
                Authorization: `${gettoken}`,
            }
      })
      

      const quarterData = res.data.averageAgePerQuarter || [];
      const formatted = quarterData.map(item => ({
        quarter: `Q${item.quarter}`,
        count: item.count,
        averageAge: parseFloat(item.averageAgeInMonths.toFixed(1))
      }));

      setAveAge(formatted);
      setcryOverview(res.data.cryClassTotal);
      setGenderData(res.data.genderRatio);

      const satisfaction = res.data.satisfaction;
      const formattedSatisfaction = [
        { name: "Good", value: satisfaction.good },
        { name: "Bad", value: satisfaction.bad }
      ];
      setSatiData(formattedSatisfaction);


      const dayNight = res.data.dayNightRatio;
      const formattedDayNight = [
        { name: "Morning", value: dayNight.dayCount },
        { name: "Evening", value: dayNight.nightCount }
      ];
      setDayNightData(formattedDayNight);
      
    }catch(err){
      console.log('Failed to get data cryList');
    }
  }
  useEffect(()=>{
    getDataCry();
  },[])
  return (
    <div className='DashCryList'>
      <div className='overView'>
        <h3>Crying overview</h3>
        <div className='classcry'>
        {
          cryOverview.map((item)=>(
            <div className="cryItem" key={item._id}>
              <img src={cryIcons[item._id]} alt="icon" />
              <p>{item.count}</p>
              <p className={`cry ${item._id}`}>{item._id}</p>
            </div>
          ))
        }
        </div>
      </div>

      <div className='AgeGenderBox'>
        <div className='AgeGender'>
          <div className='genderRatioContainer'>
            <h3>Gender</h3>
            <div className="genderRow">
              <img src={maleIcon} alt="male-icon" className='genderIcon' />
              <div className="progressBar">
                <div className="progress male" style={{width :genderData.malePercentage}}></div>
                <span>{genderData.malePercentage}</span>
              </div>
            </div>
            <div className="genderRow">
              <img src={femaleIcon} alt="female-icon" className='genderIcon' />
              <div className="progressBar">
                <div className="progress female" style={{width :genderData.femalePercentage}}></div>
                <span>{genderData.femalePercentage}</span>
              </div>
            </div>
          </div>
          <div className='ageBox'>
            <h3>Age</h3>
            <div className="genderRow">
              <p>0-3</p>
              <div className="progressBar">
                <div className="progress blue1" style={{width :'70%'}}></div>
              </div>
            </div>
            <div className="genderRow">
              <p>3-6</p>
              <div className="progressBar">
                <div className="progress blue2" style={{width :'50%'}}></div>
              </div>
            </div>
            <div className="genderRow">
              <p>6-9</p>
              <div className="progressBar">
                <div className="progress blue3" style={{width :'30%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="AgeGenderGraph">
          <div className="age-chart-card">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cryOverview} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" interval={0} tick={{ fontSize: 12, letterSpacing: 1 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Number of Cries" barSize={50} barCategoryGap={40}>
                  {cryOverview.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CRY_COLORS[index % CRY_COLORS.length]}
                      radius={[10, 10, 0, 0]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='cycleAvg'>
        <div className='Satisfaction'>
          <h3>User Satisfaction</h3>
          <div>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie
              data={satiData}
              cx="45%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {satiData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='CryClock'>
          <h3>Cry Clock</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
              data={dayNightData}
              cx="50%"
              cy="50%"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
              >
              {dayNightData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CRY_CLOCK_COLORS[index % CRY_CLOCK_COLORS.length]} />
              ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
