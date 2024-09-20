// import React from 'react'
// import './HomeEvents.css'
// import { Link } from 'react-router-dom'

// function HomeEvents() {
//   const events = [
//     {
//       id: 1,
//       title: "Kerala Boat Race Festival",
//       date: "August 15, 2023",
//       location: "Alappuzha Backwaters",
//       image: "https://media.istockphoto.com/id/500700080/photo/boat-race.jpg?s=612x612&w=0&k=20&c=URuBCCXwRXMuSUCRyA__BQ2l3610Ve8xmP-CytdYSj0=",
//       description: "Experience the thrill of traditional snake boat races in the serene backwaters of Kerala."
//     },
//     {
//       id: 2,
//       title: "Onam Celebrations",
//       date: "September 1-10, 2023",
//       location: "Across Kerala",
//       image: "https://media.istockphoto.com/id/1269222792/photo/women-celebrating-diwali.jpg?s=612x612&w=0&k=20&c=hMjNJdPLOeax8I5ZfYb6cJcCudLzR-GIlNve6IMCZ2c=",
//       description: "Join in the grandeur of Kerala's harvest festival with floral carpets, feasts, and cultural performances."
//     },
//     {
//       id: 3,
//       title: "Theyyam Ritual Art",
//       date: "October 5, 2023",
//       location: "Kannur",
//       image: "https://media.istockphoto.com/id/1213675735/photo/theyyam.jpg?s=612x612&w=0&k=20&c=h4K_NOs7jTQlXv7-C3Hu8Z7HG8NyVzaY88EYs6TD4U4=",
//       description: "Witness the vibrant and mystical Theyyam performances, a unique ritual art form of North Kerala."
//     }
//   ]

//   return (
//     <section className="home-events">
//       <div className="events-container">
//         <h2 className="events-title">Upcoming Events in Kerala</h2>
//         <p className="events-subtitle">Immerse yourself in the vibrant culture and traditions of God's Own Country</p>
//         <div className="events-grid">
//           {events.map((event) => (
//             <div key={event.id} className="event-card">
//               <div className="event-image" style={{backgroundImage: `url(${event.image})`}}>
//                 <div className="event-date">{event.date}</div>
//               </div>
//               <div className="event-content">
//                 <h3 className="event-title">{event.title}</h3>
//                 <p className="event-location">{event.location}</p>
//                 <p className="event-description">{event.description}</p>
//                 <button className="event-button">Learn More</button>
//               </div>
//             </div>
//           ))}
//         </div>
//        <Link to={'/events'} style={{textDecoration:'none'}}> <button className="view-all-events">View All Events</button></Link>
//       </div>
//     </section>
//   )
// }

// export default HomeEvents



import React, { useEffect, useState } from 'react';
import './HomeEvents.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        // const response = await fetch('/api/events/latest'); 
         const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/event/latest`)
        const result = await response.data;
        setEvents(result.data);
      } catch (error) {
        console.error('Error fetching latest events:', error);
      }
    };

    fetchLatestEvents();
  }, []);

  return (
    <section className="home-events">
      <div className="events-container">
        <h2 className="events-title">Upcoming Events in Kerala</h2>
        <p className="events-subtitle">Immerse yourself in the vibrant culture and traditions of God's Own Country</p>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image" style={{ backgroundImage: `url(${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${event.image})` }}>
                <div className="event-date">{new Date(event.date).toDateString()}</div>
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.name}</h3>
                <p className="event-location">{event.place}</p>
                <p className="event-description">{event.desc}</p>
                {/* <Link to={`/events/${event.id}`}>
                  <button className="event-button">Learn More</button>
                </Link> */}
              </div>
            </div>
          ))}
        </div>
        <Link to={'/events'} style={{ textDecoration: 'none' }}>
          <button className="view-all-events">View All Events</button>
        </Link>
      </div>
    </section>
  );
}

export default HomeEvents;
