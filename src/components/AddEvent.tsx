import React, { Dispatch, SetStateAction } from 'react';
import "../styles/Modal.css";
import { Event } from '@/app/page';

interface AddEventProps {
  selectedDate: Date;
  addEvent: (evt: Event) => void;
  eventData: Event;
  setEventData: Dispatch<SetStateAction<{ eventName: string; description: string; }>>
  handleDelete: (id: number | undefined) => void;
}

const AddEvent: React.FC<AddEventProps> = ({ selectedDate, addEvent, eventData, setEventData, handleDelete }) => {

  const handleSubmit = () => {
    let obj = {...eventData};

    if(!obj.id) {
      obj = {...obj, date: selectedDate};
    }
    addEvent(obj);
    setEventData({eventName: "", description: ""});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    setEventData(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="add-event-container">
      <input
        type="text"
        name="eventName"
        value={eventData?.eventName}
        onChange={handleChange}
        placeholder="Event Name"
        className="mb-4 p-2 border rounded w-full"
      />

      <input
        type="text"
        name="description"
        value={eventData?.description}
        onChange={handleChange}
        placeholder="Event Description"
        className="border p-2"
      />
      <div className="flex justify-center gap-4">
        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 mt-4 w-1/2 text-center">
          {eventData?.id ? "Edit" : "Add"} Event
        </button>
        {eventData?.id ? <button onClick={() => handleDelete(eventData?.id)} className="bg-red-500 text-white p-2 mt-4 w-1/2 text-center">
          Delete Event
        </button>: null}
      </div>
    </div>
  );
};

export default AddEvent;
