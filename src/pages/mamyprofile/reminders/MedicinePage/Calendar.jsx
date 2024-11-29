import React, { useState, useEffect } from 'react';
import './Calendar.css';

function Calendar() {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    generateWeek();
  }, []);

 
  const generateWeek = () => {
    const today = new Date(); 
    const currentDay = today.getDate(); 
    const currentWeekDay = today.getDay(); 

    //  بداية الأسبوع (الأحد)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(currentDay - currentWeekDay);

    //  نهاية الأسبوع (السبت)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(currentDay + (6 - currentWeekDay));

    // توليد الأيام من بداية الأسبوع لنهايته
    const week = [];
    for (let date = new Date(startOfWeek); date <= endOfWeek; date.setDate(date.getDate() + 1)) {
      week.push(new Date(date)); 
    }

    setWeekDays(week);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-dates">
        {weekDays.map((date, index) => (
          <div
            key={index}
            className={`date ${date.getDate() === new Date().getDate() ? 'today' : ''}`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
