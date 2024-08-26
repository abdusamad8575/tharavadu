import React from 'react'
import './HomeAbout.css'
import { Link } from 'react-router-dom'

function HomeAbout() {
  return (
    <section className="home-about">
      <div className="container">
        <h2 className="section-title">About Our Kerala Family</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="image.jpeg" alt="Kerala family" />
          </div>
          <div className="about-text">
            <p>Welcome to our vibrant Kerala family! Nestled in the heart of God's Own Country, we are a close-knit community that cherishes our rich cultural heritage and natural beauty.</p>
            <p>Our family's roots run deep in Kerala's lush landscapes, from the serene backwaters to the misty hills of the Western Ghats. We take pride in our traditions, cuisine, and the warm hospitality that Kerala is famous for.</p>
            <p>Join us on a journey through our family's stories, experiences, and the magic of Kerala. Whether you're a fellow Keralite or a curious traveler, we're excited to share our world with you!</p>
          <Link to={'/about'} style={{textDecoration:'none'}}>  <button className="learn-more">Learn More About Us</button></Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeAbout