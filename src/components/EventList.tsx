import React, { useMemo } from 'react';
import "../styles/EventList.css"
import { Event } from '@/app/page';

interface EventListProps {
  events: Event[];
  handleCardClick?: (evt: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, handleCardClick }) => {

  const groupEventsByDate = useMemo(() => {
    const groupedEvents = events?.reduce((acc: Record<string, Event[]>, event: Event) => {
      if(event?.date) {
        const dateKey = event?.date?.toDateString(); // Group by date string
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(event);
      }
      return acc;
    }, {});

    // Sort the grouped events by the date key
    const sortedEntries = Object.entries(groupedEvents).sort(([dateA], [dateB]) => {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });

    return Object.fromEntries(sortedEntries); // Convert sorted entries back to an object
  }, [events]);

  // console.log(JSON.stringify(groupEventsByDate))

  return (
    <div className="mt-6">
      {Object.entries(groupEventsByDate).map(([date, events], index) => (
        <div key={index} className="border-2 p-4 mb-4">
          <div className="font-bold text-orange-500">{date}</div>
          {events.map((event, idx) => (
            <div key={idx} className="border-b-2 pb-3 pt-2 last:border-none relative">
              <div className='text-lg'><span className='text-gray-500'>Title:</span> {event.eventName}</div>
              <div className='text-sm'><span className='text-gray-500'>Description:</span> {event.description}</div>
              <div className="absolute top-2 right-0 underline" onClick={() => handleCardClick ? handleCardClick(event) : null}>
                Edit
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventList;
