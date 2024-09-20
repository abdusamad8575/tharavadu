import React, { useEffect, useState } from 'react';
import './Events.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const response = await fetch(`/api/events?page=${currentPage}&limit=10`); 
        const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/api/v1/event/clientCategory?page=${currentPage}&limit=9`)
        const result = await response.data;
        
        setEvents(result.events);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavBar />
      <div className="events-container">
        <header className="events-header">
          <h1>Upcoming Events</h1>
          <p>Stay tuned for our latest events and join us for some memorable experiences.</p>
        </header>
        <section className="events-about">
          <h2>About Our Events</h2>
          <p>
            Our events are designed to bring people together, foster community spirit, and create memorable experiences. From traditional festivals to vibrant cultural rituals, each event showcases the rich heritage and unique traditions of Kerala. Join us and immerse yourself in these extraordinary celebrations!
          </p>
        </section>
        <div className="events-list">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <img src={`${import.meta.env.VITE_APP_API_BASE_URL}/uploads/${event.image}`} alt={event.name} className="event-image" />
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.place}</p>
                <p>{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination" style={{display:'flex',justifyContent:'center',marginTop:'25px'}}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button  key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
              {page}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Events;
