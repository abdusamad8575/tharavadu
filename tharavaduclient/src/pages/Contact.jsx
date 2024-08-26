import React from 'react'
import './Contact.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

function Contact() {
  return (
   <>
   <NavBar/>
        <div className="contact-container">
          <h1 className="contact-title">Get in Touch</h1>
    
          <div className="contact-content">
            <div className="contact-info">
              <h2>Contact Information</h2>
              <p>
                We would love to hear from you! Please fill out the form or reach out to us through the contact details provided.
              </p>
              <div className="contact-details">
                <p><strong>Address:</strong> 123, Kerala Street, Kochi, Kerala, India</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
                <p><strong>Email:</strong> family@example.com</p>
              </div>
              <div className="contact-social">
                <h3>Follow Us</h3>
                <a href="https://facebook.com" className="social-icon">Facebook</a>
                <a href="https://twitter.com" className="social-icon">Twitter</a>
                <a href="https://instagram.com" className="social-icon">Instagram</a>
              </div>
            </div>
    
            <div className="contact-form">
              <h2>Contact Form</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
    
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
    
                <button type="submit" className="contact-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
    <Footer/>    
   </>
  )
}

export default Contact
