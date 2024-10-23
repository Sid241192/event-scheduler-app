"use client"
import React from 'react';
import MiniCalendar from './MiniCalendar';
import EventList from './EventList';
import { Event } from '@/app/page';

interface LeftPanelProps {
  onCreateTask: () => void;
  selectedDate: Date;
  events: Array<Event>;
  toggleDrawer:  () => void;
  handleCardClick: (evt: Event) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ onCreateTask, selectedDate, events, handleCardClick }) => {
  return (
    <div className='left-panel'>
      <div>
      <button className="create-task-btn" onClick={onCreateTask}>+ Create Task</button>
      <MiniCalendar selectedDate={selectedDate} />
      </div>
        <EventList events={events} handleCardClick={handleCardClick} />
    </div>
  );
};

export default LeftPanel;
