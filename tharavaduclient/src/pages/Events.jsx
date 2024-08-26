import React from 'react';
import './Events.css';  // Ensure this CSS file is created with the styles below
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const events = [
  {
    id: 1,
    title: "Kerala Boat Race Festival",
    date: "August 15, 2023",
    location: "Alappuzha Backwaters",
    image: "https://media.istockphoto.com/id/500700080/photo/boat-race.jpg?s=612x612&w=0&k=20&c=URuBCCXwRXMuSUCRyA__BQ2l3610Ve8xmP-CytdYSj0=",
    description: "Experience the thrill of traditional snake boat races in the serene backwaters of Kerala."
  },
  {
    id: 2,
    title: "Onam Celebrations",
    date: "September 1-10, 2023",
    location: "Across Kerala",
    image: "https://media.istockphoto.com/id/1269222792/photo/women-celebrating-diwali.jpg?s=612x612&w=0&k=20&c=hMjNJdPLOeax8I5ZfYb6cJcCudLzR-GIlNve6IMCZ2c=",
    description: "Join in the grandeur of Kerala's harvest festival with floral carpets, feasts, and cultural performances."
  },
  {
    id: 3,
    title: "Theyyam Ritual Art",
    date: "October 5, 2023",
    location: "Kannur",
    image: "https://media.istockphoto.com/id/1213675735/photo/theyyam.jpg?s=612x612&w=0&k=20&c=h4K_NOs7jTQlXv7-C3Hu8Z7HG8NyVzaY88EYs6TD4U4=",
    description: "Witness the vibrant and mystical Theyyam performances, a unique ritual art form of North Kerala."
  }
];

function Events() {
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
            <div key={event.id} className="event-card">
              <img src={event.image} alt={event.title} className="event-image" />
              <div className="event-details">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-date-time">{event.date}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-location"><strong>Location:</strong> {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Events;
