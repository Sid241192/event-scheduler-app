"use client"
import React, { useState } from 'react';
import '../styles/CalendarView.css';
import EventList from './EventList';
import { Event } from '@/app/page';

interface CalendarViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  events: Array<Event>;
  onDateClick: (date: Date) => void;
  handleDateCardClick: (evt: Event) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ selectedDate, events, onDateClick, handleDateCardClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInCurrentMonth = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);

    const prevMonthDays = daysInMonth(year, month - 1); // Days in the previous month
    const calendar: {date: Date, disabled: boolean}[] = [];

    // Fill in dates from the previous month to align the first day
    for (let i = startDay - 1; i >= 0; i--) {
      calendar.push({date: new Date(year, month - 1, prevMonthDays - i), disabled: true});
    }

    // Fill in dates of the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      calendar.push({date: new Date(year, month, i), disabled: false});
    }

    // Fill in the remaining days from the next month to complete the calendar grid
    const totalCells = 35; // 6 rows * 7 days (ensures enough space)
    const remainingDays = totalCells - calendar.length;

    for (let i = 1; i <= remainingDays; i++) {
      calendar.push({date: new Date(year, month + 1, i), disabled: true});
    }

    return calendar;
  };

  const calendar = generateCalendar();

  const renderEvent = (date: Date) => {
    return events
      .filter(event => event.date.toDateString() === date.toDateString())
      .map((event, index) => (
        <div
          key={index}
          className="event-marker"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleEventClick(e, event)}
        >
          {event.eventName}
        </div>
      ));
  };

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, evt: {id: number, date: Date; eventName: string, description: string }) => {
    e.stopPropagation(); // Prevents the event from bubbling up
    handleDateCardClick(evt)
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-navigation">
        <button onClick={previousMonth}>Previous</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
        <button onClick={nextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-header">{day}</div>
        ))}
        {calendar.map(({date, disabled}, index) =>
          date ? (
            <div
              key={index}
              className={`calendar-day ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''} ${disabled ? "disabled" : ""}`}
              onClick={() => onDateClick(date)}
            >
              <div>{date.getDate()}</div>
              <div>{renderEvent(date)}</div>
              {/* <EventList events={events} /> */}
            </div>
          ) : (
            <div key={index} className="calendar-day empty"></div>
          )
        )}
      </div>
      <div className='w-full sm:hidden'>
      <EventList events={events} handleCardClick={handleDateCardClick} />
      </div>
    </div>
  );
};

export default CalendarView;
