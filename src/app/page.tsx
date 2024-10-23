"use client"
import React, { useState, useEffect } from 'react';
import CalendarView from '../components/CalendarView';
import AddEvent from '../components/AddEvent';
import LeftPanel from '../components/LeftPanel';
import Modal from '../components/Modal';

export type Event = {
  id?: number;
  date?: Date;
  eventName: string;
  description: string;
}

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Array<Event>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [eventData, setEventData] = useState({eventName:"", description:""});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event?.target as Element; // Assert target as Element
      if (window.innerWidth < 768 && 
          !target.closest('.left-panel') && 
          !target.closest('.mobile-drawer-toggle')) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(!isModalOpen) {
      setEventData({eventName:"", description:""});
    }
  },[isModalOpen])


  const addEvent = (evt: Event) => {
    const {id, date, eventName, description} = evt;
    if(id) {
      const eventsCopy = structuredClone(events);
      const newEventsList = eventsCopy?.map((event) => {
        if(event?.id === id) {
          return ({...event, eventName, description})
        } else {
          return event;
        }
      })
      setEvents(newEventsList)
    } else {
      setEvents([...events, {id: +new Date(), date, eventName, description }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete =(id?: number) => {
    if(id) {
      const eventsCopy = structuredClone(events);
      const newEventsList = eventsCopy.filter(evt => evt?.id !== id);
      setEvents(newEventsList);
    }
    setIsModalOpen(false)
  }

  const handleCreateTask = () => {
    setSelectedDate(new Date());
    setIsModalOpen(true);
    if(window.innerWidth < 768){
      setIsDrawerOpen(false);
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleDateCardClick  = (evt: Event) => {
    setEventData(evt);
    setIsModalOpen(true);
  }

  return (
    <div className="mx-auto">
      <div className='w-full h-[50px] flex items-center justify-start border border-[#DADCE0]'>
      <button className="hidden sm:block mobile-drawer-toggle pb-2" onClick={toggleDrawer}>☰</button>
      <div>NextJS Calender</div>
      </div>
      <div className="w-full h-[calc(100vh-50px)] grid grid-cols-12 mx-auto">
          <div className={`hidden ${isDrawerOpen ? "col-span-3 sm:block" : ""}`}>
      <LeftPanel onCreateTask={handleCreateTask} selectedDate={selectedDate} events={events}
        toggleDrawer={toggleDrawer} handleCardClick={handleDateCardClick} />
          </div>
          <div className={`col-span-12 ${isDrawerOpen ? "sm:col-span-9" : ""}`}>
      <div className="main-content flex-1 px-2">
        <CalendarView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
          handleDateCardClick={handleDateCardClick}
          onDateClick={handleDateClick}
          />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddEvent selectedDate={selectedDate} addEvent={addEvent} eventData={eventData} setEventData={setEventData} handleDelete={handleDelete} />
        </Modal>
      </div>
        </div>
          </div>
    </div>
  );
};

export default Home;
