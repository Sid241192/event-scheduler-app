"use client";
import React, { useState } from 'react';

interface MiniCalendarProps {
  selectedDate: Date;
}

const MiniCalendar: React.FC<MiniCalendarProps> = ({ selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const daysOfWeek = ["S", "M", "T", "W", "Th", "F", "Sa"];

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const calendar: Array<Date | null> = [];
    for (let i = 0; i < startDay; i++) {
      calendar.push(null); // Represents empty slots before the 1st of the month
    }
    for (let i = 1; i <= days; i++) {
      calendar.push(new Date(year, month, i));
    }
    return calendar;
  };

  const calendar = generateCalendar();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="mini-calendar-container">
      <div className="mini-calendar-navigation">
        <button onClick={previousMonth}>Prev</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="mini-calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="mini-calendar-header">{day}</div>
        ))}
        {calendar.map((date, index) => {
          if (!date) {
            return <div key={index} className="mini-calendar-day empty"></div>;
          }
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          return (
            <div
              key={index}
              className={`mini-calendar-day ${isSelected ? 'selected' : ''}`}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
